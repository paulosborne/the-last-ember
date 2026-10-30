import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import Fastify from 'fastify'
import { createHash, randomBytes, randomUUID } from 'node:crypto'
import { getConfig } from './config.js'
import { openDatabase } from './db.js'

const config = getConfig()
const database = openDatabase(config.databasePath)
const app = Fastify({ logger: { redact: ['req.headers.authorization', 'req.headers.cookie'] } })
await app.register(cookie, { secret: config.sessionSecret })
await app.register(rateLimit, { max: 100, timeWindow: '1 minute' })
app.get('/api/health', async () => ({ status: 'ok' }))
const hash = (value: string) => createHash('sha256').update(value).digest('hex')
const now = () => new Date().toISOString()
const callback = `${config.appOrigin}/api/auth/discord/callback`

app.get('/api/auth/discord/start', { config: { rateLimit: { max: 10, timeWindow: '1 minute' } } }, async (_request, reply) => {
  const state = randomBytes(32).toString('base64url')
  const transaction = randomBytes(32).toString('base64url')
  const verifier = randomBytes(48).toString('base64url')
  const challenge = createHash('sha256').update(verifier).digest('base64url')
  database.prepare('INSERT INTO oauth_login_transactions VALUES (?, ?, ?, ?, NULL)').run(hash(state), hash(transaction), verifier, new Date(Date.now() + 600000).toISOString())
  reply.setCookie('oauth_transaction', transaction, { httpOnly: true, sameSite: 'lax', path: '/api/auth/discord', secure: false, maxAge: 600 })
  return reply.redirect(`https://discord.com/oauth2/authorize?${new URLSearchParams({ client_id: config.discordClientId, redirect_uri: callback, response_type: 'code', scope: 'identify', state, code_challenge: challenge, code_challenge_method: 'S256' })}`)
})

app.get('/api/auth/discord/callback', async (request, reply) => {
  const query = request.query as { code?: string; state?: string; error?: string }
  const transaction = request.cookies.oauth_transaction
  if (query.error) return reply.redirect(`${config.appOrigin}/?auth=cancelled`)
  if (!query.code || !query.state || !transaction) return reply.redirect(`${config.appOrigin}/?auth=invalid`)
  const record = database.prepare('SELECT * FROM oauth_login_transactions WHERE state_hash = ? AND used_at IS NULL AND expires_at > ?').get(hash(query.state), now()) as { transaction_cookie_hash: string; pkce_verifier: string } | undefined
  if (!record || record.transaction_cookie_hash !== hash(transaction)) return reply.redirect(`${config.appOrigin}/?auth=invalid`)
  database.prepare('UPDATE oauth_login_transactions SET used_at = ? WHERE state_hash = ?').run(now(), hash(query.state))
  try {
    const token = await fetch('https://discord.com/api/oauth2/token', { method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ client_id: config.discordClientId, client_secret: config.discordClientSecret, grant_type: 'authorization_code', code: query.code, redirect_uri: callback, code_verifier: record.pkce_verifier }) })
    if (!token.ok) throw new Error('token')
    const tokenData = await token.json() as { access_token: string }
    const identity = await fetch('https://discord.com/api/users/@me', { headers: { authorization: `Bearer ${tokenData.access_token}` } })
    if (!identity.ok) throw new Error('identity')
    const user = await identity.json() as { id: string; global_name?: string; username: string; avatar?: string }
    const member = await fetch(`https://discord.com/api/guilds/${config.discordGuildId}/members/${user.id}`, { headers: { authorization: `Bot ${config.discordBotToken}` } })
    if (member.status === 404) return reply.redirect(`${config.appOrigin}/?auth=not-member`)
    if (!member.ok) throw new Error('guild')
    const memberId = randomUUID(); const displayName = user.global_name ?? user.username
    database.prepare("INSERT INTO members VALUES (?, ?, ?, ?, 'verified', ?, NULL, ?, ?) ON CONFLICT(discord_id) DO UPDATE SET display_name=excluded.display_name, avatar_hash=excluded.avatar_hash, membership_status='verified', verified_at=excluded.verified_at, updated_at=excluded.updated_at").run(memberId, user.id, displayName, user.avatar ?? null, now(), now(), now())
    const local = database.prepare('SELECT id FROM members WHERE discord_id = ?').get(user.id) as { id: string }
    const session = randomBytes(32).toString('base64url'); const csrf = randomBytes(32).toString('base64url'); const expiry = new Date(Date.now() + 8 * 3600000).toISOString(); const absolute = new Date(Date.now() + 14 * 86400000).toISOString()
    database.prepare('INSERT INTO sessions VALUES (?, ?, ?, ?, ?, ?, ?, NULL, ?)').run(hash(session), local.id, hash(csrf), expiry, absolute, now(), now(), now())
    reply.setCookie('session', session, { httpOnly: true, sameSite: 'lax', path: '/api', secure: false, maxAge: 8 * 3600 }).clearCookie('oauth_transaction', { path: '/api/auth/discord' })
    return reply.redirect(`${config.appOrigin}/?auth=success`)
  } catch { return reply.redirect(`${config.appOrigin}/?auth=unavailable`) }
})

app.get('/api/me', async (request) => {
  const session = request.cookies.session
  if (!session) return { member: null }
  return { member: database.prepare('SELECT m.display_name, m.avatar_hash FROM sessions s JOIN members m ON m.id=s.member_id WHERE s.id_hash=? AND s.revoked_at IS NULL AND s.expires_at > ? AND s.absolute_expires_at > ?').get(hash(session), now(), now()) ?? null }
})
app.post('/api/auth/logout', async (request, reply) => { if (request.cookies.session) database.prepare('UPDATE sessions SET revoked_at=? WHERE id_hash=?').run(now(), hash(request.cookies.session)); reply.clearCookie('session', { path: '/api' }); return { ok: true } })
const shutdown = async () => { database.close(); await app.close() }
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
await app.listen({ port: config.port, host: '127.0.0.1' })

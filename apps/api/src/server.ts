import cookie from '@fastify/cookie'
import rateLimit from '@fastify/rate-limit'
import Fastify from 'fastify'
import { getConfig } from './config.js'
import { openDatabase } from './db.js'

const config = getConfig()
const database = openDatabase(config.databasePath)
const app = Fastify({ logger: { redact: ['req.headers.authorization', 'req.headers.cookie'] } })
await app.register(cookie, { secret: config.sessionSecret })
await app.register(rateLimit, { max: 100, timeWindow: '1 minute' })
app.get('/api/health', async () => ({ status: 'ok' }))
const shutdown = async () => { database.close(); await app.close() }
process.once('SIGINT', shutdown)
process.once('SIGTERM', shutdown)
await app.listen({ port: config.port, host: '127.0.0.1' })

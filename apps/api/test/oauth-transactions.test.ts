import { randomUUID } from 'node:crypto'
import { rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { openDatabase } from '../src/db.js'
import { claimOAuthTransaction } from '../src/oauth-transactions.js'

const stateHash = 'state-hash'
const cookieHash = 'cookie-hash'
const verifier = 'pkce-verifier'
const now = '2026-01-01T00:00:00.000Z'

function createDatabase() {
  const path = join(tmpdir(), `last-ember-oauth-${randomUUID()}.sqlite`)
  const database = openDatabase(path)
  return { database, path }
}

function seed(database: ReturnType<typeof openDatabase>, expiresAt = '2026-01-01T00:10:00.000Z') {
  database.prepare('INSERT INTO oauth_login_transactions VALUES (?, ?, ?, ?, NULL)').run(stateHash, cookieHash, verifier, expiresAt)
}

function cleanup(database: ReturnType<typeof openDatabase>, path: string) {
  database.close()
  rmSync(path, { force: true })
  rmSync(`${path}-shm`, { force: true })
  rmSync(`${path}-wal`, { force: true })
}

describe('claimOAuthTransaction', () => {
  it('claims a valid transaction once and returns its verifier', () => {
    const { database, path } = createDatabase()
    seed(database)

    expect(claimOAuthTransaction(database, stateHash, cookieHash, now, now)).toEqual({ pkce_verifier: verifier })
    expect(claimOAuthTransaction(database, stateHash, cookieHash, now, now)).toBeUndefined()

    cleanup(database, path)
  })

  it.each([
    ['expired', stateHash, cookieHash, '2025-12-31T23:59:00.000Z'],
    ['incorrect state', 'wrong-state', cookieHash, '2026-01-01T00:10:00.000Z'],
    ['incorrect binding', stateHash, 'wrong-cookie', '2026-01-01T00:10:00.000Z'],
  ])('rejects a %s transaction', (_name, candidateState, candidateCookie, expiresAt) => {
    const { database, path } = createDatabase()
    seed(database, expiresAt)

    expect(claimOAuthTransaction(database, candidateState, candidateCookie, now, now)).toBeUndefined()

    cleanup(database, path)
  })

  it('allows only one of two database connections to claim the same transaction', async () => {
    const path = join(tmpdir(), `last-ember-oauth-${randomUUID()}.sqlite`)
    const first = openDatabase(path)
    const second = openDatabase(path)
    seed(first)

    const results = await Promise.all([
      Promise.resolve(claimOAuthTransaction(first, stateHash, cookieHash, now, now)),
      Promise.resolve(claimOAuthTransaction(second, stateHash, cookieHash, now, now)),
    ])

    expect(results.filter(Boolean)).toHaveLength(1)
    expect(results.filter((result) => result === undefined)).toHaveLength(1)

    first.close()
    second.close()
    rmSync(path, { force: true })
    rmSync(`${path}-shm`, { force: true })
    rmSync(`${path}-wal`, { force: true })
  })
})

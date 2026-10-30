import { randomUUID } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import { describe, expect, it } from 'vitest'
import { openDatabase } from '../src/db.js'
import { claimOAuthTransaction } from '../src/oauth-transactions.js'

const stateHash = 'state-hash'
const cookieHash = 'cookie-hash'
const verifier = 'pkce-verifier'
const now = '2026-01-01T00:00:00.000Z'

function createDatabase() {
  const directory = mkdtempSync(join(tmpdir(), `last-ember-oauth-${randomUUID()}-`))
  const path = join(directory, 'database.sqlite')
  const database = openDatabase(path)
  return { database, path, directory }
}

function seed(database: ReturnType<typeof openDatabase>, expiresAt = '2026-01-01T00:10:00.000Z') {
  database.prepare('INSERT INTO oauth_login_transactions VALUES (?, ?, ?, ?, NULL)').run(stateHash, cookieHash, verifier, expiresAt)
}

function cleanup(database: ReturnType<typeof openDatabase>, directory: string) {
  database.close()
  rmSync(directory, { force: true, recursive: true })
}

describe('claimOAuthTransaction', () => {
  it('claims a valid transaction once and returns its verifier', () => {
    const { database, directory } = createDatabase()
    seed(database)

    expect(claimOAuthTransaction(database, stateHash, cookieHash, now, now)).toEqual({ pkce_verifier: verifier })
    expect(claimOAuthTransaction(database, stateHash, cookieHash, now, now)).toBeUndefined()

    cleanup(database, directory)
  })

  it.each([
    ['expired', stateHash, cookieHash, '2025-12-31T23:59:00.000Z'],
    ['incorrect state', 'wrong-state', cookieHash, '2026-01-01T00:10:00.000Z'],
    ['incorrect binding', stateHash, 'wrong-cookie', '2026-01-01T00:10:00.000Z'],
  ])('rejects a %s transaction', (_name, candidateState, candidateCookie, expiresAt) => {
    const { database, directory } = createDatabase()
    seed(database, expiresAt)

    expect(claimOAuthTransaction(database, candidateState, candidateCookie, now, now)).toBeUndefined()

    cleanup(database, directory)
  })

  it('rejects a transaction at the exact expiry boundary', () => {
    const { database, directory } = createDatabase()
    seed(database, now)

    expect(claimOAuthTransaction(database, stateHash, cookieHash, now, now)).toBeUndefined()

    cleanup(database, directory)
  })

  it('allows only one of two synchronized processes to claim the same transaction', async () => {
    // The workers rendezvous on ready files, then are released together. This
    // exercises independent SQLite processes, not JavaScript Promise ordering.
    const { database, path, directory } = createDatabase()
    seed(database)
    database.close()

    const readyPaths = [join(directory, 'first.ready'), join(directory, 'second.ready')]
    const resultPaths = [join(directory, 'first.result'), join(directory, 'second.result')]
    const releasePath = join(directory, 'release')
    const workerPath = new URL('./oauth-claim-worker.ts', import.meta.url).pathname
    const workers = readyPaths.map((readyPath, index) => spawn(process.execPath, ['--import', 'tsx', workerPath, path, readyPath, releasePath, resultPaths[index]], { stdio: 'ignore' }))

    await waitForFiles(readyPaths)
    writeFileSync(releasePath, 'go')
    await Promise.all(workers.map((worker) => new Promise<void>((resolve, reject) => {
      worker.once('error', reject)
      worker.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`claim worker exited with ${code}`)))
    })))

    const results = resultPaths.map((resultPath) => JSON.parse(readFileSync(resultPath, 'utf8')) as { claimed: boolean; hasVerifier: boolean })
    expect(results.filter((result) => result.claimed)).toHaveLength(1)
    expect(results.filter((result) => !result.claimed)).toHaveLength(1)
    expect(results.filter((result) => result.claimed && result.hasVerifier)).toHaveLength(1)
    expect(results.filter((result) => !result.claimed && !result.hasVerifier)).toHaveLength(1)

    const verification = openDatabase(path)
    expect(verification.prepare('SELECT used_at FROM oauth_login_transactions WHERE state_hash = ?').get(stateHash)).toMatchObject({ used_at: expect.any(String) })
    verification.close()
    rmSync(directory, { force: true, recursive: true })
  })
})

async function waitForFiles(paths: string[]) {
  while (!paths.every((path) => existsSync(path))) {
    await new Promise((resolve) => setTimeout(resolve, 1))
  }
}

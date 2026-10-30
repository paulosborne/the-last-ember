import { existsSync, writeFileSync } from 'node:fs'
import { openDatabase } from '../src/db.js'
import { claimOAuthTransaction } from '../src/oauth-transactions.js'

const [databasePath, readyPath, releasePath, resultPath] = process.argv.slice(2)
if (!databasePath || !readyPath || !releasePath || !resultPath) throw new Error('Worker arguments are required')

const database = openDatabase(databasePath)
writeFileSync(readyPath, 'ready')
while (!existsSync(releasePath)) await new Promise((resolve) => setTimeout(resolve, 1))

const result = claimOAuthTransaction(database, 'state-hash', 'cookie-hash', '2026-01-01T00:00:00.000Z', '2026-01-01T00:00:00.000Z')
writeFileSync(resultPath, JSON.stringify({ claimed: Boolean(result), hasVerifier: Boolean(result?.pkce_verifier) }))
database.close()

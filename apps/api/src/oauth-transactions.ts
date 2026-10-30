import type { DatabaseSync } from 'node:sqlite'

type ClaimedTransaction = {
  pkce_verifier: string
}

export function claimOAuthTransaction(
  database: DatabaseSync,
  stateHash: string,
  transactionCookieHash: string,
  consumedAt: string,
  currentTime: string,
) {
  return database.prepare(`
    UPDATE oauth_login_transactions
    SET used_at = ?
    WHERE state_hash = ?
      AND transaction_cookie_hash = ?
      AND used_at IS NULL
      AND expires_at > ?
    RETURNING pkce_verifier
  `).get(consumedAt, stateHash, transactionCookieHash, currentTime) as ClaimedTransaction | undefined
}

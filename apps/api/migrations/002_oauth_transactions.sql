CREATE TABLE IF NOT EXISTS oauth_login_transactions (state_hash TEXT PRIMARY KEY, transaction_cookie_hash TEXT NOT NULL, pkce_verifier TEXT NOT NULL, expires_at TEXT NOT NULL, used_at TEXT);

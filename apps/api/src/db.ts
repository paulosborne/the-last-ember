import { DatabaseSync } from 'node:sqlite'
import { mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

export function openDatabase(path: string) {
  mkdirSync(dirname(path), { recursive: true })
  const database = new DatabaseSync(path)
  database.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA busy_timeout = 5000; CREATE TABLE IF NOT EXISTS schema_migrations (version TEXT PRIMARY KEY, applied_at TEXT NOT NULL);')
  const migrationDir = join(import.meta.dirname, '../migrations')
  for (const version of readdirSync(migrationDir).filter((file) => file.endsWith('.sql')).sort()) {
    if (!database.prepare('SELECT 1 FROM schema_migrations WHERE version = ?').get(version)) {
      database.exec('BEGIN IMMEDIATE;')
      try { database.exec(readFileSync(join(migrationDir, version), 'utf8')); database.prepare('INSERT INTO schema_migrations VALUES (?, datetime(\'now\'))').run(version); database.exec('COMMIT;') } catch (error) { database.exec('ROLLBACK;'); throw error }
    }
  }
  return database
}

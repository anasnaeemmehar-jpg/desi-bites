import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// DB_PATH lets production (e.g. Render persistent disk) point at a mounted
// volume; defaults to the repo's database/ folder for local dev.
const dbDir = process.env.DB_DIR || path.join(__dirname, '..', '..', 'database');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const dbPath = path.join(dbDir, 'desibites.db');

const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

export default db;
export { dbPath, dbDir };

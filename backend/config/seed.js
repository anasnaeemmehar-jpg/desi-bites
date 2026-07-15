import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import db from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// desibites.sql (the schema/seed source) always lives in the repo's database/
// folder, regardless of where the .db file itself is written (DB_DIR).
const sqlPath = path.join(__dirname, '..', 'database', 'desibites.sql');

console.log('Seeding database...');

const sql = fs.readFileSync(sqlPath, 'utf-8');
db.exec(sql);

// Create default admin if none exists
const existingAdmin = db.prepare('SELECT * FROM admins WHERE email = ?').get('admin@desibites.com');
if (!existingAdmin) {
  const hashedPassword = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO admins (name, email, password, role) VALUES (?, ?, ?, ?)').run(
    'Super Admin',
    'admin@desibites.com',
    hashedPassword,
    'super_admin'
  );
  console.log('Default admin created: admin@desibites.com / admin123');
} else {
  console.log('Admin already exists, skipping.');
}

console.log('Seeding complete!');

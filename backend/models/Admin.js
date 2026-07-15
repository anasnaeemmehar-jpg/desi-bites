import db from '../config/database.js';

const Admin = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM admins WHERE email = ?').get(email);
  },
  findById(id) {
    return db.prepare('SELECT id, name, email, role, created_at FROM admins WHERE id = ?').get(id);
  },
  updatePassword(id, hashedPassword) {
    return db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hashedPassword, id);
  },
};

export default Admin;

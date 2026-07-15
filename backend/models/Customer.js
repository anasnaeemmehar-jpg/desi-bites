import db from '../config/database.js';

const Customer = {
  getAll() {
    return db.prepare('SELECT id, name, email, phone, address, created_at FROM customers ORDER BY created_at DESC').all();
  },

  getById(id) {
    return db.prepare('SELECT id, name, email, phone, address, created_at FROM customers WHERE id = ?').get(id);
  },

  findByPhone(phone) {
    return db.prepare('SELECT * FROM customers WHERE phone = ?').get(phone);
  },

  findByEmail(email) {
    return db.prepare('SELECT * FROM customers WHERE email = ?').get(email);
  },

  create({ name, email, phone, password, address }) {
    const result = db
      .prepare('INSERT INTO customers (name, email, phone, password, address) VALUES (?, ?, ?, ?, ?)')
      .run(name, email ?? null, phone, password ?? null, address ?? null);
    return this.getById(result.lastInsertRowid);
  },

  update(id, { name, email, phone, address }) {
    db.prepare('UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?').run(
      name,
      email,
      phone,
      address,
      id
    );
    return this.getById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM customers WHERE id = ?').run(id);
  },
};

export default Customer;

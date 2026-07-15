import db from '../config/database.js';

const Category = {
  getAll() {
    return db.prepare('SELECT * FROM categories ORDER BY name ASC').all();
  },
  getById(id) {
    return db.prepare('SELECT * FROM categories WHERE id = ?').get(id);
  },
  getBySlug(slug) {
    return db.prepare('SELECT * FROM categories WHERE slug = ?').get(slug);
  },
  create({ name, slug, image }) {
    const result = db
      .prepare('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)')
      .run(name, slug, image);
    return this.getById(result.lastInsertRowid);
  },
  update(id, { name, slug, image }) {
    db.prepare('UPDATE categories SET name = ?, slug = ?, image = ? WHERE id = ?').run(
      name,
      slug,
      image,
      id
    );
    return this.getById(id);
  },
  delete(id) {
    return db.prepare('DELETE FROM categories WHERE id = ?').run(id);
  },
};

export default Category;

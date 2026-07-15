import db from '../config/database.js';

const Product = {
  getAll({ category, featured } = {}) {
    let query = `
      SELECT p.*, c.name AS category_name, c.slug AS category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      query += ' AND c.slug = ?';
      params.push(category);
    }
    if (featured) {
      query += ' AND p.is_featured = 1';
    }
    query += ' ORDER BY p.created_at DESC';

    return db.prepare(query).all(...params);
  },

  getById(id) {
    return db
      .prepare(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.id = ?`
      )
      .get(id);
  },

  getBySlug(slug) {
    return db
      .prepare(
        `SELECT p.*, c.name AS category_name, c.slug AS category_slug
         FROM products p LEFT JOIN categories c ON p.category_id = c.id
         WHERE p.slug = ?`
      )
      .get(slug);
  },

  create(data) {
    const {
      category_id,
      name,
      slug,
      description,
      price,
      discount_price,
      image,
      is_available = 1,
      is_featured = 0,
    } = data;

    const result = db
      .prepare(
        `INSERT INTO products
         (category_id, name, slug, description, price, discount_price, image, is_available, is_featured)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        category_id,
        name,
        slug,
        description,
        price,
        discount_price ?? null,
        image,
        is_available,
        is_featured
      );

    return this.getById(result.lastInsertRowid);
  },

  update(id, data) {
    const {
      category_id,
      name,
      slug,
      description,
      price,
      discount_price,
      image,
      is_available,
      is_featured,
    } = data;

    db.prepare(
      `UPDATE products SET
        category_id = ?, name = ?, slug = ?, description = ?, price = ?,
        discount_price = ?, image = ?, is_available = ?, is_featured = ?
       WHERE id = ?`
    ).run(
      category_id,
      name,
      slug,
      description,
      price,
      discount_price ?? null,
      image,
      is_available,
      is_featured,
      id
    );

    return this.getById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM products WHERE id = ?').run(id);
  },
};

export default Product;

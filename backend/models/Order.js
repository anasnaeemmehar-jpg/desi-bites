import db from '../config/database.js';

const Order = {
  getAll({ status } = {}) {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';
    const orders = db.prepare(query).all(...params);
    return orders.map((order) => ({ ...order, items: this.getItems(order.id) }));
  },

  getById(id) {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    if (!order) return null;
    return { ...order, items: this.getItems(id) };
  },

  getItems(orderId) {
    return db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);
  },

  create({ customer_id, customer_name, customer_phone, customer_address, items, payment_method, notes }) {
    const total_amount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const insertOrder = db.prepare(
      `INSERT INTO orders
       (customer_id, customer_name, customer_phone, customer_address, total_amount, payment_method, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    );

    const insertItem = db.prepare(
      `INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
       VALUES (?, ?, ?, ?, ?)`
    );

    const transaction = db.transaction(() => {
      const result = insertOrder.run(
        customer_id ?? null,
        customer_name,
        customer_phone,
        customer_address,
        total_amount,
        payment_method ?? 'cod',
        notes ?? null
      );
      const orderId = result.lastInsertRowid;

      for (const item of items) {
        insertItem.run(orderId, item.product_id ?? null, item.product_name, item.price, item.quantity);
      }

      return orderId;
    });

    const orderId = transaction();
    return this.getById(orderId);
  },

  updateStatus(id, status) {
    db.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
    return this.getById(id);
  },

  updatePaymentStatus(id, payment_status) {
    db.prepare('UPDATE orders SET payment_status = ? WHERE id = ?').run(payment_status, id);
    return this.getById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM orders WHERE id = ?').run(id);
  },

  getStats() {
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const totalRevenue = db.prepare("SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE status != 'cancelled'").get().total;
    const pendingOrders = db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'pending'").get().count;
    const totalCustomers = db.prepare('SELECT COUNT(*) as count FROM customers').get().count;
    return { totalOrders, totalRevenue, pendingOrders, totalCustomers };
  },
};

export default Order;

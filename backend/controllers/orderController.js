import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import { printReceipt } from '../config/printer.js';

const VALID_STATUSES = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

export async function createOrder(req, res, next) {
  try {
    const { customer_name, customer_phone, customer_address, items, payment_method, notes } = req.body;

    if (!customer_name || !customer_phone || !customer_address) {
      return res.status(400).json({ success: false, message: 'Customer name, phone and address are required' });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
    }

    // find or create customer by phone
    let customer = Customer.findByPhone(customer_phone);
    if (!customer) {
      customer = Customer.create({
        name: customer_name,
        phone: customer_phone,
        address: customer_address,
      });
    }

    const order = Order.create({
      customer_id: customer.id,
      customer_name,
      customer_phone,
      customer_address,
      items,
      payment_method,
      notes,
    });

    printReceipt(order);

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const { status } = req.query;
    const orders = Order.getAll({ status });
    res.json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    next(err);
  }
}

export async function getOrder(req, res, next) {
  try {
    const { id } = req.params;
    const order = Order.getById(id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const existing = Order.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const order = Order.updateStatus(id, status);
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
}

export async function getOrderStats(req, res, next) {
  try {
    const stats = Order.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
}

export async function deleteOrder(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Order.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    Order.delete(id);
    res.json({ success: true, message: 'Order deleted' });
  } catch (err) {
    next(err);
  }
}

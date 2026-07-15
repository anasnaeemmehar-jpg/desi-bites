import Customer from '../models/Customer.js';

export async function getCustomers(req, res, next) {
  try {
    const customers = Customer.getAll();
    res.json({ success: true, count: customers.length, data: customers });
  } catch (err) {
    next(err);
  }
}

export async function getCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const customer = Customer.getById(id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
}

export async function updateCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Customer.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    const { name, email, phone, address } = req.body;
    const customer = Customer.update(id, {
      name: name ?? existing.name,
      email: email ?? existing.email,
      phone: phone ?? existing.phone,
      address: address ?? existing.address,
    });
    res.json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
}

export async function deleteCustomer(req, res, next) {
  try {
    const { id } = req.params;
    const existing = Customer.getById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    Customer.delete(id);
    res.json({ success: true, message: 'Customer deleted' });
  } catch (err) {
    next(err);
  }
}

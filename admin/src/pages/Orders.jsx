import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { api } from '../services/api.js';
import './Orders.css';

const STATUS_OPTIONS = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    loadOrders();
  }, [filter]);

  function loadOrders() {
    setLoading(true);
    api
      .getOrders(filter || undefined)
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }

  async function handleStatusChange(id, status) {
    await api.updateOrderStatus(id, status);
    loadOrders();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this order permanently?')) return;
    await api.deleteOrder(id);
    loadOrders();
  }

  return (
    <Layout title="Orders" subtitle="Track and manage incoming orders">
      <div className="orders-filters">
        <button className={`filter-chip ${filter === '' ? 'active' : ''}`} onClick={() => setFilter('')}>
          All
        </button>
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            className={`filter-chip ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="card">
        {loading ? (
          <p style={{ padding: 24 }}>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <>
                  <tr
                    key={order.id}
                    className="order-row"
                    onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                  >
                    <td>#{order.id}</td>
                    <td>
                      <strong>{order.customer_name}</strong>
                      <p className="order-phone">{order.customer_phone}</p>
                    </td>
                    <td>Rs {order.total_amount}</td>
                    <td style={{ textTransform: 'uppercase', fontSize: '0.75rem' }}>
                      {order.payment_method}
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <select
                        className={`status-select badge-${order.status}`}
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s.replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedId === order.id && (
                    <tr className="order-details-row">
                      <td colSpan={6}>
                        <div className="order-details">
                          <div>
                            <strong>Delivery Address</strong>
                            <p>{order.customer_address}</p>
                          </div>
                          {order.notes && (
                            <div>
                              <strong>Notes</strong>
                              <p>{order.notes}</p>
                            </div>
                          )}
                          <div>
                            <strong>Items</strong>
                            {order.items?.map((item) => (
                              <p key={item.id}>
                                {item.quantity} × {item.product_name} — Rs {item.price * item.quantity}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#6B6157', padding: 30 }}>
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}

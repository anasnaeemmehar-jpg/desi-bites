import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getOrderStats(), api.getOrders()])
      .then(([statsRes, ordersRes]) => {
        setStats(statsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout title="Dashboard" subtitle="Overview of your restaurant's performance">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="stats-grid">
            <StatCard label="Total Orders" value={stats.totalOrders} icon="🧾" />
            <StatCard label="Total Revenue" value={`Rs ${stats.totalRevenue}`} icon="💰" />
            <StatCard label="Pending Orders" value={stats.pendingOrders} icon="⏳" accent />
            <StatCard label="Customers" value={stats.totalCustomers} icon="👥" />
          </div>

          <div className="card recent-orders-card">
            <div className="recent-orders-header">
              <h3>Recent Orders</h3>
              <Link to="/orders" className="btn btn-secondary">
                View all
              </Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.customer_name}</td>
                    <td>Rs {order.total_amount}</td>
                    <td>
                      <span className={`badge badge-${order.status}`}>{order.status}</span>
                    </td>
                  </tr>
                ))}
                {recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ textAlign: 'center', color: '#6B6157' }}>
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </Layout>
  );
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div className={`card stat-card ${accent ? 'accent' : ''}`}>
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}

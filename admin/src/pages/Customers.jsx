import { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { api } from '../services/api.js';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  function loadCustomers() {
    setLoading(true);
    api
      .getCustomers()
      .then((res) => setCustomers(res.data))
      .finally(() => setLoading(false));
  }

  async function handleDelete(id) {
    if (!confirm('Delete this customer record?')) return;
    await api.deleteCustomer(id);
    loadCustomers();
  }

  return (
    <Layout title="Customers" subtitle="Everyone who's ordered from you">
      <div className="card">
        {loading ? (
          <p style={{ padding: 24 }}>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <strong>{customer.name}</strong>
                  </td>
                  <td>{customer.phone}</td>
                  <td>{customer.email || '—'}</td>
                  <td>{customer.address || '—'}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(customer.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: '#6B6157', padding: 30 }}>
                    No customers yet.
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

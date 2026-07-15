import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { api } from '../services/api.js';
import './TrackOrder.css';

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'preparing', label: 'Preparing' },
  { key: 'on_the_way', label: 'On the Way' },
  { key: 'delivered', label: 'Delivered' },
];

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      fetchOrder(initialId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialId]);

  async function fetchOrder(id) {
    setLoading(true);
    setError(null);
    setSearched(true);
    try {
      const res = await api.getOrder(id);
      setOrder(res.data);
    } catch (err) {
      setOrder(null);
      setError("We couldn't find an order with that ID.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (orderId.trim()) fetchOrder(orderId.trim());
  }

  const isCancelled = order?.status === 'cancelled';
  const currentStepIndex = STATUS_STEPS.findIndex((s) => s.key === order?.status);

  return (
    <div className="container track-page">
      <span className="section-eyebrow">Where's my food?</span>
      <h1 className="section-title">Track Your Order</h1>

      <form className="track-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your order ID (e.g. 1)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Track
        </button>
      </form>

      {loading && <Loader label="Looking up your order..." />}
      {error && !loading && <p className="track-error">{error}</p>}

      {!loading && order && (
        <div className="track-result">
          <div className="track-order-meta">
            <div>
              <span className="track-label">Order #{order.id}</span>
              <h2>{order.customer_name}</h2>
              <p>{order.customer_address}</p>
            </div>
            <div className="track-total">
              <span className="track-label">Total</span>
              <span className="price-tag price-lg">Rs {order.total_amount}</span>
            </div>
          </div>

          {isCancelled ? (
            <p className="track-cancelled">This order has been cancelled.</p>
          ) : (
            <div className="status-tracker">
              {STATUS_STEPS.map((step, idx) => (
                <div
                  key={step.key}
                  className={`status-step ${idx <= currentStepIndex ? 'done' : ''} ${
                    idx === currentStepIndex ? 'current' : ''
                  }`}
                >
                  <div className="status-dot" />
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="track-items">
            <h3>Items</h3>
            {order.items?.map((item) => (
              <div className="track-item-row" key={item.id}>
                <span>
                  {item.quantity} × {item.product_name}
                </span>
                <span>Rs {item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && searched && !order && !error && (
        <p className="track-error">No order found.</p>
      )}
    </div>
  );
}

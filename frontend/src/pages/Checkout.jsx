import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../services/api.js';
import './Checkout.css';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_address: '',
    payment_method: 'cod',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = totalPrice >= 1500 ? 0 : 100;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <h1>Nothing to check out</h1>
        <p>Your cart is empty right now.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse the menu
        </Link>
      </div>
    );
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const orderData = {
        ...form,
        items: items.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      };
      const res = await api.createOrder(orderData);
      clearCart();
      navigate(`/track-order?id=${res.data.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container checkout-page">
      <h1 className="section-title">Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              required
              placeholder="Your full name"
            />
          </label>

          <label>
            Phone Number
            <input
              type="tel"
              name="customer_phone"
              value={form.customer_phone}
              onChange={handleChange}
              required
              placeholder="03XX-XXXXXXX"
            />
          </label>

          <label>
            Delivery Address
            <textarea
              name="customer_address"
              value={form.customer_address}
              onChange={handleChange}
              required
              rows={3}
              placeholder="House #, street, area, city"
            />
          </label>

          <label>
            Payment Method
            <select name="payment_method" value={form.payment_method} onChange={handleChange}>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Card (pay on delivery)</option>
            </select>
          </label>

          <label>
            Order Notes (optional)
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Any special instructions?"
            />
          </label>

          {error && <p className="checkout-error">{error}</p>}

          <button type="submit" className="btn btn-primary place-order-btn" disabled={submitting}>
            {submitting ? 'Placing order...' : `Place Order · Rs ${grandTotal}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h3>Order Summary</h3>
          {items.map((item) => (
            <div className="checkout-summary-row" key={item.id}>
              <span>
                {item.quantity} × {item.name}
              </span>
              <span>Rs {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : `Rs ${deliveryFee}`}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs {grandTotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

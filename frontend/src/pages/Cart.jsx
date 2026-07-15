import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { imageUrl } from '../services/api.js';
import './Cart.css';

export default function Cart() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  const deliveryFee = totalPrice >= 1500 || totalPrice === 0 ? 0 : 100;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="container cart-empty">
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything yet.</p>
        <Link to="/menu" className="btn btn-primary">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container cart-page">
      <h1 className="section-title">Your Cart</h1>

      <div className="cart-grid">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={imageUrl(item.image)} alt={item.name} className="cart-item-img" />
              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <span className="price-tag">Rs {item.price}</span>
              </div>
              <div className="quantity-selector small">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">
                  −
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">
                  +
                </button>
              </div>
              <span className="cart-item-subtotal">Rs {item.price * item.quantity}</span>
              <button
                className="cart-item-remove"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name}`}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>Rs {totalPrice}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? 'Free' : `Rs ${deliveryFee}`}</span>
          </div>
          {totalPrice < 1500 && (
            <p className="summary-hint">Add Rs {1500 - totalPrice} more for free delivery</p>
          )}
          <div className="summary-row total">
            <span>Total</span>
            <span>Rs {grandTotal}</span>
          </div>
          <button className="btn btn-primary checkout-btn" onClick={() => navigate('/checkout')}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

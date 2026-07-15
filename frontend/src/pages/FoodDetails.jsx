import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { api, imageUrl } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import './FoodDetails.css';

export default function FoodDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    setAdded(false);
    api
      .getProduct(slug)
      .then((res) => setProduct(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <Loader label="Loading dish..." />;
  if (error || !product) {
    return (
      <div className="container food-details-error">
        <p>Couldn't find that dish.</p>
        <Link to="/menu" className="btn btn-primary">
          Back to menu
        </Link>
      </div>
    );
  }

  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const displayPrice = hasDiscount ? product.discount_price : product.price;

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
  }

  return (
    <div className="container food-details">
      <button className="back-link" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="food-details-grid">
        <div className="food-details-image">
          <img src={imageUrl(product.image)} alt={product.name} />
        </div>

        <div className="food-details-info">
          {product.category_name && (
            <span className="section-eyebrow">{product.category_name}</span>
          )}
          <h1>{product.name}</h1>
          <p className="food-details-desc">
            {product.description || 'A delicious desi favourite, made fresh to order.'}
          </p>

          <div className="food-details-price-row">
            {hasDiscount && <span className="price-strike-lg">Rs {product.price}</span>}
            <span className="price-tag price-lg">Rs {displayPrice}</span>
          </div>

          {!product.is_available ? (
            <p className="sold-out-msg">This item is currently sold out.</p>
          ) : (
            <>
              <div className="quantity-selector">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                  −
                </button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} aria-label="Increase quantity">
                  +
                </button>
              </div>

              <button className="btn btn-primary add-to-cart-btn" onClick={handleAddToCart}>
                Add to cart · Rs {displayPrice * quantity}
              </button>

              {added && (
                <p className="added-confirm">
                  Added to cart! <Link to="/cart">View cart →</Link>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

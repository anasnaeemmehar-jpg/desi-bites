import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { imageUrl } from '../services/api.js';
import './FoodCard.css';

export default function FoodCard({ product }) {
  const { addItem } = useCart();
  const hasDiscount = product.discount_price && product.discount_price < product.price;

  function handleAdd(e) {
    e.preventDefault();
    addItem(product, 1);
  }

  return (
    <Link to={`/food/${product.slug}`} className="food-card">
      <div className="food-card-image-wrap">
        <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
        {hasDiscount && <span className="food-card-badge">Sale</span>}
        {!product.is_available && <div className="food-card-unavailable">Sold Out</div>}
      </div>

      <div className="food-card-body">
        <h3 className="food-card-name">{product.name}</h3>
        {product.category_name && (
          <span className="food-card-category">{product.category_name}</span>
        )}

        <div className="food-card-footer">
          <div className="food-card-price">
            {hasDiscount && <span className="price-strike">Rs {product.price}</span>}
            <span className="price-tag">Rs {hasDiscount ? product.discount_price : product.price}</span>
          </div>
          <button
            className="food-card-add"
            onClick={handleAdd}
            disabled={!product.is_available}
            aria-label={`Add ${product.name} to cart`}
          >
            +
          </button>
        </div>
      </div>
    </Link>
  );
}

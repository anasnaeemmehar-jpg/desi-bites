import { Link } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/menu?category=${category.slug}`} className="category-card">
      <div className="category-card-icon">{getCategoryEmoji(category.slug)}</div>
      <span className="category-card-name">{category.name}</span>
    </Link>
  );
}

function getCategoryEmoji(slug) {
  const map = {
    biryani: '🍛',
    bbq: '🍢',
    karahi: '🍲',
    'fast-food': '🍔',
    desserts: '🍮',
    beverages: '🥤',
  };
  return map[slug] || '🍽️';
}

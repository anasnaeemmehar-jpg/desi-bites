import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodCard from '../components/FoodCard.jsx';
import Loader from '../components/Loader.jsx';
import { api } from '../services/api.js';
import './Menu.css';

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.getCategories().then((res) => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .getProducts(activeCategory ? { category: activeCategory } : {})
      .then((res) => {
        if (!cancelled) setProducts(res.data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeCategory]);

  function selectCategory(slug) {
    if (slug) {
      setSearchParams({ category: slug });
    } else {
      setSearchParams({});
    }
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container menu-page">
      <div className="menu-header">
        <div>
          <span className="section-eyebrow">Our Menu</span>
          <h1 className="section-title">Everything, made fresh to order</h1>
        </div>
        <input
          type="search"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="menu-search"
          aria-label="Search dishes"
        />
      </div>

      <div className="menu-filters">
        <button
          className={`filter-chip ${activeCategory === '' ? 'active' : ''}`}
          onClick={() => selectCategory('')}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`filter-chip ${activeCategory === cat.slug ? 'active' : ''}`}
            onClick={() => selectCategory(cat.slug)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading && <Loader label="Loading menu..." />}
      {error && <p className="section-error">{error}</p>}

      {!loading && !error && filteredProducts.length === 0 && (
        <p className="menu-empty">No dishes found. Try a different search or category.</p>
      )}

      {!loading && !error && filteredProducts.length > 0 && (
        <div className="food-grid">
          {filteredProducts.map((product) => (
            <FoodCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

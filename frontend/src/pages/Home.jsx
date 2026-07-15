import { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import FoodCard from '../components/FoodCard.jsx';
import Loader from '../components/Loader.jsx';
import { api } from '../services/api.js';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [catRes, prodRes] = await Promise.all([
          api.getCategories(),
          api.getProducts({ featured: 'true' }),
        ]);
        if (!cancelled) {
          setCategories(catRes.data);
          setFeatured(prodRes.data);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="home-page">
      <Hero />

      <section className="container section">
        <span className="section-eyebrow">Browse by craving</span>
        <h2 className="section-title">What are you in the mood for?</h2>

        {loading && <Loader label="Loading categories..." />}
        {error && <p className="section-error">{error}</p>}

        {!loading && !error && (
          <div className="category-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>

      <section className="container section">
        <div className="section-header-row">
          <div>
            <span className="section-eyebrow">Crowd favourites</span>
            <h2 className="section-title">Featured dishes</h2>
          </div>
          <Link to="/menu" className="btn btn-secondary">
            View full menu
          </Link>
        </div>

        {loading && <Loader label="Loading dishes..." />}

        {!loading && !error && (
          <div className="food-grid">
            {featured.map((product) => (
              <FoodCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="promo-band">
        <div className="container promo-inner">
          <h2>Free delivery on orders over Rs 1500</h2>
          <p>Order straight from your favourite dishes — hot, fresh, and on time.</p>
          <Link to="/menu" className="btn btn-primary">
            Start an order
          </Link>
        </div>
      </section>
    </div>
  );
}

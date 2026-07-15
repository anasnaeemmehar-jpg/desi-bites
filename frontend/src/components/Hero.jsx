import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="section-eyebrow" style={{ color: '#F4C874' }}>
            Desi flavour, done right
          </span>
          <h1 className="hero-title">
            Food that tastes like <em>ghar ka khana</em>,<br /> at takeaway speed.
          </h1>
          <p className="hero-sub">
            Biryani, BBQ, karahi and more — cooked fresh to order and delivered
            hot across the city.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="btn btn-primary">
              Order Now
            </Link>
            <Link to="/menu" className="btn btn-outline-cream">
              View Menu
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-fade" />
    </section>
  );
}

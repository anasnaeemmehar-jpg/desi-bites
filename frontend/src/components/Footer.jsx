import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            Desi<span>Bites</span>
          </div>
          <p>Home-style desi cooking, made fresh and delivered hot to your door.</p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <Link to="/menu">Full Menu</Link>
          <Link to="/track-order">Track an Order</Link>
          <Link to="/cart">Your Cart</Link>
        </div>

        <div className="footer-col">
          <h4>Get in touch</h4>
          <p>Open daily · 12pm – 12am</p>
          <p>+92 300 1234567</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} DesiBites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

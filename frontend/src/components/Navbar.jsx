import { Link, NavLink } from 'react-router-dom';
import CartIcon from './CartIcon.jsx';
import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo">
          Desi<span>Bites</span>
        </Link>

        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'active' : '')}>
            Menu
          </NavLink>
          <NavLink to="/track-order" className={({ isActive }) => (isActive ? 'active' : '')}>
            Track Order
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

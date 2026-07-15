import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './Sidebar.css';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '📊', end: true },
  { to: '/products', label: 'Products', icon: '🍛' },
  { to: '/categories', label: 'Categories', icon: '🏷️' },
  { to: '/orders', label: 'Orders', icon: '🧾' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Sidebar() {
  const { admin, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        Desi<span>Bites</span>
        <span className="sidebar-logo-tag">Admin</span>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-admin">
          <div className="sidebar-avatar">{admin?.name?.[0] || 'A'}</div>
          <div>
            <p className="sidebar-admin-name">{admin?.name}</p>
            <p className="sidebar-admin-role">{admin?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <button className="sidebar-logout" onClick={logout}>
          Log out
        </button>
      </div>
    </aside>
  );
}

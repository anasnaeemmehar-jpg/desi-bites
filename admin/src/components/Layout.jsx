import Sidebar from './Sidebar.jsx';
import './Layout.css';

export default function Layout({ children, title, subtitle }) {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        {(title || subtitle) && (
          <header className="admin-page-header">
            {title && <h1>{title}</h1>}
            {subtitle && <p>{subtitle}</p>}
          </header>
        )}
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="container not-found-page">
      <span className="not-found-code">404</span>
      <h1>This plate's empty.</h1>
      <p>We couldn't find the page you were looking for.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

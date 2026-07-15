import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();

  if (loading) {
    return <div style={{ padding: 60, textAlign: 'center', color: '#6B6157' }}>Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

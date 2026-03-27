import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100vh', color: '#8b5cf6', fontSize: '18px'
      }}>
        <div className="spinner" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

import { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .getProfile()
      .then((res) => setAdmin(res.admin))
      .catch(() => {
        localStorage.removeItem('desibites_admin_token');
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await api.login(email, password);
    localStorage.setItem('desibites_admin_token', res.token);
    setAdmin(res.admin);
    return res.admin;
  }

  function logout() {
    localStorage.removeItem('desibites_admin_token');
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

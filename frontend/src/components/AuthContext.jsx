import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:8000';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('resumeiq_token');
    if (token) {
      axios
        .get(`${API}/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem('resumeiq_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (googleCredential) => {
    const res = await axios.post(`${API}/auth/google`, { credential: googleCredential });
    localStorage.setItem('resumeiq_token', res.data.access_token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('resumeiq_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

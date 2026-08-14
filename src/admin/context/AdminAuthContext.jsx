import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(null);

const MOCK_ADMIN = {
  email: 'admin',
  password: 'admin123',
  name: 'Jerush Dentoface',
  role: 'Super Admin',
  avatar: null
};

const AUTH_STORAGE_KEY = 'jerush_admin_auth';

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check localStorage and verify token on mount
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('jerush_admin_token');
      const storedUser = localStorage.getItem(AUTH_STORAGE_KEY);
      
      if (token && storedUser) {
        try {
          if (token === 'static_mock_token_admin_bladbin') {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }
          const res = await fetch('/api/auth.php?action=verify', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.success) {
              setUser(data.user);
              setIsAuthenticated(true);
              localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
            } else {
              throw new Error('Verify failed');
            }
          } else {
            throw new Error('Invalid token');
          }
        } catch (e) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
          localStorage.removeItem('jerush_admin_token');
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(true);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data.user));
          localStorage.setItem('jerush_admin_token', data.token);
          return { success: true };
        } else {
          return { success: false, message: data.message || 'Invalid credentials. Please try again.' };
        }
      }
      throw new Error('API server unreachable');
    } catch (err) {
      console.warn("Backend auth failed, trying offline mock auth:", err);
      if (email === MOCK_ADMIN.email && password === MOCK_ADMIN.password) {
        const fakeToken = 'static_mock_token_admin_bladbin';
        setUser(MOCK_ADMIN);
        setIsAuthenticated(true);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(MOCK_ADMIN));
        localStorage.setItem('jerush_admin_token', fakeToken);
        return { success: true, isOffline: true };
      }
      return { success: false, message: 'Invalid credentials or API server offline.' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem('jerush_admin_token');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brandSky border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

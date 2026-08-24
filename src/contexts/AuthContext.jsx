import { createContext, useContext, useState, useCallback } from 'react';
import { mockUsers } from '../data/mockUsers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mineguard_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    const found = mockUsers.find(u => u.email === email && u.password === password);
    if (found) {
      const userData = { ...found, password: undefined };
      setUser(userData);
      localStorage.setItem('mineguard_user', JSON.stringify(userData));
      setIsLoading(false);
      return userData;
    } else {
      setError('Invalid email or password');
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('mineguard_user');
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    role: user?.role || null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

export default AuthContext;

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simula a verificação de um token de autenticação no localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulação de autenticação
    // Em um cenário real, você faria uma chamada de API aqui
    if (email === 'gestor@drantonio.ai' && password === 'password123') {
      const userData = { email, name: 'Gestor Teste' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push('/painel');
      return true;
    } else if (email === 'consultor@drantonio.ai' && password === 'password123') {
      const userData = { email, name: 'Consultor Teste' };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      router.push('/painel');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


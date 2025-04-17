'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  nome: string;
  email: string;
  avatar?: string;
  rank?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se há um usuário salvo no localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Aqui você faria a chamada para sua API de autenticação
      // Por enquanto, vamos simular um login bem-sucedido
      const mockUser: User = {
        id: '1',
        nome: 'Usuário Teste',
        email: email,
        avatar: '👤',
        rank: 'Nemo'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw new Error('Falha ao fazer login. Verifique suas credenciais.');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Aqui você faria a chamada para sua API de registro
      // Por enquanto, vamos simular um registro bem-sucedido
      const mockUser: User = {
        id: '1',
        nome: name,
        email: email,
        avatar: '👤',
        rank: 'Nemo'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw new Error('Falha ao registrar. Tente novamente.');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

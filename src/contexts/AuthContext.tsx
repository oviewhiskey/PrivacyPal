
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserLevel } from '@/types';
import { logAuditEvent } from '@/utils/auditLog';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, level: UserLevel) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('privacypal_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Log login attempt
    logAuditEvent('login_attempt', email);
    
    // Admin credentials
    if (email === 'voviewhiskey@3consult-ng.com' && password === 'Victor') {
      const adminUser: User = {
        id: 'admin',
        name: 'Admin',
        email: 'voviewhiskey@3consult-ng.com',
        level: 'admin',
        createdAt: new Date().toISOString()
      };
      setUser(adminUser);
      localStorage.setItem('privacypal_user', JSON.stringify(adminUser));
      
      // Log successful login
      logAuditEvent('login_success', email, 'admin');
      
      setIsLoading(false);
      return true;
    }

    // Check localStorage for registered users
    const users = JSON.parse(localStorage.getItem('privacypal_users') || '[]');
    const foundUser = users.find((u: User) => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('privacypal_user', JSON.stringify(foundUser));
      
      // Log successful login
      logAuditEvent('login_success', email, foundUser.level);
      
      setIsLoading(false);
      return true;
    }
    
    // Log failed login
    logAuditEvent('login_failure', email);
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string, level: UserLevel): Promise<boolean> => {
    setIsLoading(true);
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('privacypal_users') || '[]');
    if (users.some((u: User) => u.email === email)) {
      setIsLoading(false);
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      level,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('privacypal_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('privacypal_user', JSON.stringify(newUser));
    
    // Log successful registration/login
    logAuditEvent('login_success', email, level);
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    if (user) {
      // Log logout
      logAuditEvent('logout', user.email, user.level);
    }
    
    setUser(null);
    localStorage.removeItem('privacypal_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

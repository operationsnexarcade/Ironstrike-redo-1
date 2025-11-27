import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { backend } from '../services/backend';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  signup: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, avatarUrl: string) => Promise<void>;
  
  isAuthModalOpen: boolean;
  setAuthModalOpen: (isOpen: boolean) => void;
  isDashboardOpen: boolean;
  setDashboardOpen: (isOpen: boolean) => void;
  isAdminPanelOpen: boolean;
  setAdminPanelOpen: (isOpen: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isDashboardOpen, setDashboardOpen] = useState(false);
  const [isAdminPanelOpen, setAdminPanelOpen] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
        try {
            const currentUser = await backend.auth.getCurrentUser();
            setUser(currentUser);
        } catch (e) {
            console.error("Session check failed", e);
        } finally {
            setIsLoading(false);
        }
    };
    initAuth();
  }, []);

  const login = async (email: string, password?: string) => {
    if (!password) {
        alert("Password is required.");
        return;
    }
    try {
        const loggedInUser = await backend.auth.loginWithPassword(email, password);
        setUser(loggedInUser);
    } catch (e: any) {
        console.error(e);
        alert(e.message || "Login failed");
        throw e;
    }
  };

  const signup = async (name: string, email: string, password?: string) => {
    try {
        const newUser = await backend.auth.signup(name, email, password || 'password');
        setUser(newUser);
    } catch (e: any) {
        console.error(e);
        alert(e.message || "Signup failed");
        throw e;
    }
  };

  const logout = async () => {
    await backend.auth.logout();
    setUser(null);
    setDashboardOpen(false);
    setAdminPanelOpen(false);
  };

  const updateProfile = async (name: string, avatarUrl: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, avatarUrl };
    await backend.auth.updateUser(updatedUser);
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'Admin',
      isLoading,
      login,
      signup,
      logout,
      updateProfile,
      isAuthModalOpen,
      setAuthModalOpen,
      isDashboardOpen,
      setDashboardOpen,
      isAdminPanelOpen,
      setAdminPanelOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};
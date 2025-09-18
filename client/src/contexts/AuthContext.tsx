import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthUser, login, signup, logout, getProfile, saveToken, saveUser, getUser, isAuthenticated } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'tourist' | 'police') => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isAuthenticated()) {
          const savedUser = getUser();
          if (savedUser) {
            setUser(savedUser);
            // Optionally refresh user data from server
            try {
              const profileResponse = await getProfile();
              if (profileResponse.success) {
                setUser(profileResponse.user);
                saveUser(profileResponse.user);
              }
            } catch (error) {
              console.error('Failed to refresh user profile:', error);
              // If profile fetch fails, clear auth state
              setUser(null);
            }
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await login(email, password);
      
      if (response.success) {
        saveToken(response.token);
        saveUser(response.user);
        setUser(response.user);
        
        // Navigate based on user role
        if (response.user.role === 'tourist') {
          navigate('/tourist');
        } else if (response.user.role === 'police') {
          navigate('/police');
        } else {
          navigate('/analytics');
        }
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string, role: 'tourist' | 'police') => {
    try {
      setLoading(true);
      const response = await signup(name, email, password, role);
      
      if (response.success) {
        saveToken(response.token);
        saveUser(response.user);
        setUser(response.user);
        
        // Navigate based on user role
        if (response.user.role === 'tourist') {
          navigate('/tourist');
        } else if (response.user.role === 'police') {
          navigate('/police');
        } else {
          navigate('/analytics');
        }
      } else {
        throw new Error(response.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local state even if server logout fails
      setUser(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      if (isAuthenticated()) {
        const profileResponse = await getProfile();
        if (profileResponse.success) {
          setUser(profileResponse.user);
          saveUser(profileResponse.user);
        }
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
    refreshUser,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
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

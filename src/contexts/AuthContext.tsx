import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginAsDemo: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ADMIN: AdminUser = {
  id: 'admin-alnujoom-1',
  email: 'admin@alnujoom.com',
  name: 'AlNujoom Store Manager',
  role: 'admin',
};

const AUTH_STORAGE_KEY = 'alnujoom_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || 'admin@alnujoom.com',
              name: session.user.user_metadata?.full_name || 'Admin',
              role: 'admin',
            });
            setIsDemoMode(false);
            setIsLoading(false);
            return;
          }
        }

        // Check local storage session
        const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          setUser(parsed);
          setIsDemoMode(true);
        }
      } catch (err) {
        console.warn('Auth check error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@alnujoom.com',
            name: session.user.user_metadata?.full_name || 'Admin',
            role: 'admin',
          });
          setIsDemoMode(false);
        } else if (!localStorage.getItem(AUTH_STORAGE_KEY)) {
          setUser(null);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    // Try Supabase auth if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          // If Supabase credentials failed or user not yet in auth table, check demo fallback
          if (email.toLowerCase() === 'admin@alnujoom.com' && (password === 'Admin@123' || password === 'admin123')) {
            setUser(DEMO_ADMIN);
            setIsDemoMode(true);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_ADMIN));
            setIsLoading(false);
            return { success: true };
          }
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data.user) {
          const authUser: AdminUser = {
            id: data.user.id,
            email: data.user.email || email,
            name: data.user.user_metadata?.full_name || 'Admin',
            role: 'admin',
          };
          setUser(authUser);
          setIsDemoMode(false);
          localStorage.removeItem(AUTH_STORAGE_KEY);
          setIsLoading(false);
          return { success: true };
        }
      } catch (err: any) {
        console.warn('Supabase auth failed, trying demo fallback:', err);
      }
    }

    // Demo / offline authentication
    if (
      (email.toLowerCase() === 'admin@alnujoom.com' || email.toLowerCase() === 'admin') &&
      (password === 'Admin@123' || password === 'admin123' || password === 'admin')
    ) {
      setUser(DEMO_ADMIN);
      setIsDemoMode(true);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_ADMIN));
      setIsLoading(false);
      return { success: true };
    }

    setIsLoading(false);
    return {
      success: false,
      error: 'Invalid credentials. Please use admin@alnujoom.com / Admin@123 or click "Demo Admin Login".',
    };
  };

  const loginAsDemo = async (): Promise<void> => {
    setUser(DEMO_ADMIN);
    setIsDemoMode(true);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_ADMIN));
  };

  const logout = async (): Promise<void> => {
    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Error signing out of Supabase:', e);
      }
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setIsDemoMode(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        isDemoMode,
        login,
        logout,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

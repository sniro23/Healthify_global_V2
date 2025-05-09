'use client';

import * as React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';
import { SupabaseAuthService, AuthUser } from './supabaseAuthService';
import { Subscription } from '@supabase/supabase-js';

export interface AuthContextState {
  user: AuthUser | null;
  loading: boolean;
  error: Error | null;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  authService: SupabaseAuthService;
}

const AuthContext = createContext<AuthContextState>({
  user: null,
  loading: true,
  error: null,
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, authService }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const session = await authService.getSession();
        setUser(session?.user ?? null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to get session'));
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: { subscription } } = authService.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [authService]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
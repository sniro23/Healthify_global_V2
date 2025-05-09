'use client';

import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@healthify/types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

interface UseAuthHookReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export function useAuthHook(): UseAuthHookReturn {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  const supabase = createClientComponentClient();

  const handleError = (error: Error) => {
    console.error('Auth error:', error);
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  // Initialize auth state
  useEffect(() => {
    console.log('Auth: Initializing auth state...');
    
    let isMounted = true;
    
    const initAuth = async () => {
      try {
        console.log('Auth: Getting session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (error) {
          console.error('Auth: Session error', error);
          throw error;
        }

        console.log('Auth: Session result', session ? 'Session exists' : 'No session');

        if (session?.user) {
          // Get user profile data
          console.log('Auth: Getting user profile...', session.user);
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (!isMounted) return;
            
            if (profileError) {
              console.error('Auth: Profile error', profileError);
              // If profile not found, create a fallback user object
              const fallbackUser = {
                id: session.user.id,
                email: session.user.email,
                created_at: session.user.created_at,
                role: 'patient',
                name: session.user.email?.split('@')[0] || 'User',
              };
              
              console.log('Auth: Using fallback user', fallbackUser);
              
              // Create user profile in the database
              try {
                const { error: insertError } = await supabase
                  .from('users')
                  .insert([fallbackUser]);
                
                if (insertError) {
                  console.error('Auth: Error creating user profile', insertError);
                } else {
                  console.log('Auth: Created user profile successfully');
                }
              } catch (insertError) {
                console.error('Auth: Exception creating user profile', insertError);
              }
              
              setState({
                user: fallbackUser as User,
                isLoading: false,
                error: null,
              });
              return;
            }

            console.log('Auth: Profile found', !!profile);
            setState({
              user: profile,
              isLoading: false,
              error: null,
            });
          } catch (profileError) {
            if (!isMounted) return;
            console.error('Auth: Profile fetch exception', profileError);
            
            // Create a fallback user object
            const fallbackUser = {
              id: session.user.id,
              email: session.user.email || 'user@example.com',
              created_at: session.user.created_at || new Date().toISOString(),
              role: 'patient',
              name: session.user.email?.split('@')[0] || 'User',
            };
            
            setState({
              user: fallbackUser as User,
              isLoading: false,
              error: null,
            });
          }
        } else {
          console.log('Auth: No user in session');
          setState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Auth: Init exception', error);
        handleError(error as Error);
      }
    };

    initAuth();

    // Set a safety timeout to prevent perpetual loading
    const safetyTimeout = setTimeout(() => {
      if (isMounted && state.isLoading) {
        console.log('Auth: Safety timeout triggered - forcing loading state to false');
        setState(prev => ({ 
          ...prev, 
          isLoading: false,
          error: new Error('Authentication timed out')
        }));
      }
    }, 5000);

    // Subscribe to auth changes
    let subscription: { unsubscribe: () => void } | null = null;
    
    try {
      const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log('Auth: Auth state change event', event);
        
        if (!isMounted) return;
        
        if (session?.user) {
          // Get user profile data
          try {
            const { data: profile, error: profileError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (!isMounted) return;
            
            if (profileError) {
              console.error('Auth: Profile error on state change', profileError);
              // Provide a fallback user
              const fallbackUser = {
                id: session.user.id,
                email: session.user.email || 'user@example.com',
                created_at: session.user.created_at || new Date().toISOString(),
                role: 'patient',
                name: session.user.email?.split('@')[0] || 'User',
              };
              
              // Try to create the user profile
              try {
                const { error: insertError } = await supabase
                  .from('users')
                  .insert([fallbackUser]);
                
                if (insertError) {
                  console.error('Auth: Error creating user profile on state change', insertError);
                } else {
                  console.log('Auth: Created user profile on state change successfully');
                }
              } catch (insertError) {
                console.error('Auth: Exception creating user profile on state change', insertError);
              }
              
              setState({
                user: fallbackUser as User,
                isLoading: false,
                error: null,
              });
              return;
            }

            setState({
              user: profile,
              isLoading: false,
              error: null,
            });
          } catch (profileError) {
            if (!isMounted) return;
            console.error('Auth: Profile fetch exception on state change', profileError);
            // Provide a fallback user
            const fallbackUser = {
              id: session.user.id,
              email: session.user.email || 'user@example.com', 
              created_at: session.user.created_at || new Date().toISOString(),
              role: 'patient',
              name: session.user.email?.split('@')[0] || 'User',
            };
            
            setState({
              user: fallbackUser as User,
              isLoading: false,
              error: null,
            });
          }
        } else {
          setState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      });
      
      subscription = data.subscription;
    } catch (error) {
      console.error('Auth: Error setting up auth listener', error);
    }

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [supabase]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      console.log('Auth: Signing in...');
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // Don't set state here as the auth listener will handle it
    } catch (error) {
      console.error('Auth: Sign in error', error);
      handleError(error as Error);
    }
  }, [supabase]);

  const signUp = useCallback(async (email: string, password: string, userData: Partial<User>) => {
    try {
      console.log('Auth: Signing up...');
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });
      
      if (error) throw error;

      // If signUp is successful but no session (email confirmation required)
      if (!data.session) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: null
        }));
        return;
      }
      
      // If we have a session, the onAuthStateChange will handle setting the user
    } catch (error) {
      console.error('Auth: Sign up error', error);
      handleError(error as Error);
    }
  }, [supabase]);

  const signOut = useCallback(async () => {
    try {
      console.log('Auth: Signing out...');
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Don't set state here as the auth listener will handle it
    } catch (error) {
      console.error('Auth: Sign out error', error);
      handleError(error as Error);
    }
  }, [supabase]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      console.log('Auth: Resetting password...');
      setState(prev => ({ ...prev, isLoading: true }));
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('Auth: Reset password error', error);
      handleError(error as Error);
    }
  }, [supabase]);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    try {
      console.log('Auth: Updating profile...');
      setState(prev => ({ ...prev, isLoading: true }));
      
      if (!state.user?.id) throw new Error('No user logged in');

      const { error } = await supabase
        .from('users')
        .update(data)
        .eq('id', state.user.id);

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: prev.user ? { ...prev.user, ...data } : null,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Auth: Update profile error', error);
      handleError(error as Error);
    }
  }, [supabase, state.user?.id]);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
  };
} 
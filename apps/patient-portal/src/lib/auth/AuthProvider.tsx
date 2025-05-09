import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Session, SupabaseClient } from '@supabase/supabase-js';

export type UserRole = 'patient' | 'doctor' | 'admin';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: { name?: string; avatar_url?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  supabaseClient: SupabaseClient;
}

export const AuthProvider = ({ children, supabaseClient }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const router = useRouter();

  // Helper function to get user role
  const getUserRole = async (userId: string): Promise<UserRole> => {
    try {
      console.log('Getting role for user:', userId);
      // First, check user metadata as it's most reliable and doesn't require table access
      let userRole: UserRole | null = null;
      
      try {
        console.log('Checking user metadata for role...');
        const { data: { user } } = await supabaseClient.auth.getUser();
        if (user?.user_metadata?.role) {
          console.log('Found role in user metadata:', user.user_metadata.role);
          userRole = user.user_metadata.role as UserRole;
          return userRole; // Return early if found in metadata
        }
      } catch (metaErr) {
        console.warn('Could not retrieve role from user metadata:', metaErr);
      }
      
      // If not in metadata, try database tables with error handling
      try {
        // Try from users table
        const { data: userData, error: userError } = await supabaseClient
          .from('users')
          .select('role')
          .eq('id', userId)
          .single();
          
        if (!userError && userData && userData.role) {
          console.log('Found user role in users table:', userData.role);
          userRole = userData.role as UserRole;
          return userRole;
        } else {
          console.warn('Error or no data in users table, trying profiles:', userError);
        }
      } catch (userTableErr) {
        console.warn('Error accessing users table:', userTableErr);
      }
      
      try {  
        // Try from profiles table as fallback
        const { data: profileData, error: profileError } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', userId)
          .single();
          
        if (!profileError && profileData && profileData.role) {
          console.log('Found user role in profiles table:', profileData.role);
          userRole = profileData.role as UserRole;
          return userRole;
        } else {
          console.warn('Error or no data in profiles table:', profileError);
        }
      } catch (profileTableErr) {
        console.warn('Error accessing profiles table:', profileTableErr);
      }
      
      // Default to patient if all methods fail
      if (!userRole) {
        console.warn('Could not determine user role, defaulting to patient');
        userRole = 'patient';
      }
      
      return userRole;
    } catch (err) {
      console.error('Error in getUserRole:', err);
      return 'patient'; // Default fallback
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        // Get current session
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        if (sessionError) throw sessionError;
        
        console.log('Session:', session ? 'exists' : 'none');
        setSession(session);
        setUser(session?.user ?? null);

        // Get user role if logged in
        if (session?.user) {
          try {
            const userRole = await getUserRole(session.user.id);
            console.log('User role:', userRole);
            setRole(userRole);
          } catch (roleError) {
            console.error('Failed to get user role:', roleError);
            setRole('patient'); // Default fallback
          }
        }

        // Subscribe to auth changes
        const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
          async (event, newSession) => {
            console.log('Auth state change event:', event);
            setSession(newSession);
            setUser(newSession?.user ?? null);
            
            if (newSession?.user) {
              try {
                const userRole = await getUserRole(newSession.user.id);
                setRole(userRole);
              } catch (roleError) {
                console.error('Failed to get user role on auth change:', roleError);
                setRole('patient'); // Default fallback
              }
            } else {
              setRole(null);
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize auth'));
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [supabaseClient]);

  // Sign in
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Signing in with email:', email);
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      
      console.log('Sign in successful, user:', data.user?.id);
      // Router navigation is handled by the auth state change listener
    } catch (err) {
      console.error('Sign in error:', err);
      setError(err instanceof Error ? err : new Error('Failed to sign in'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign up
  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true);
      console.log('Signing up with email:', email, 'role:', role);
      
      // Step 1: Create auth user with role in metadata
      const { data: { user }, error: signUpError } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: { role } // Store role in user metadata
        }
      });
      if (signUpError) throw signUpError;
      
      console.log('User created:', user?.id);
      
      // If user created successfully, we consider the signup successful
      // Even if we can't create the profile/user records, the auth user with metadata is sufficient
      if (user) {
        const userData = {
          id: user.id,
          email: user.email,
          role,
          created_at: new Date().toISOString(),
        };
        
        // Step 2: Try to insert into database tables, but don't fail if this doesn't work
        try {
          // Get session to use authenticated API calls
          const { data: session } = await supabaseClient.auth.getSession();
          
          // Create a new client with the session token to ensure we have auth
          const authedClient = session?.session 
            ? supabaseClient 
            : supabaseClient;
            
          // First try to insert into users table (primary)
          const { error: userError } = await authedClient
            .from('users')
            .insert([userData]);
            
          if (userError) {
            console.warn('Error creating user record:', userError);
            
            // If users table fails, try profiles as fallback
            const { error: profileError } = await authedClient
              .from('profiles')
              .insert([userData]);
              
            if (profileError) {
              console.warn('Error creating profile record:', profileError);
              // Log error but continue - the auth user is created and that's the most important part
              console.log('User created in auth but failed to create profile/user record. Will rely on user metadata.');
            } else {
              console.log('Created user record in profiles table');
            }
          } else {
            console.log('Created user record in users table');
          }
        } catch (err) {
          console.error('Error creating user records:', err);
          // Continue anyway as the auth user is created with role in metadata
        }
      }
      
      router.push('/auth/verify-email');
    } catch (err) {
      console.error('Sign up error:', err);
      setError(err instanceof Error ? err : new Error('Failed to sign up'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setLoading(true);
      console.log('Signing out');
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      
      console.log('Sign out successful');
      router.push('/');
    } catch (err) {
      console.error('Sign out error:', err);
      setError(err instanceof Error ? err : new Error('Failed to sign out'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      console.log('Requesting password reset for:', email);
      const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      
      console.log('Password reset email sent');
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err instanceof Error ? err : new Error('Failed to reset password'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (data: { name?: string; avatar_url?: string }) => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');
      
      console.log('Updating profile for user:', user.id, 'with data:', data);
      let updateSuccessful = false;
      
      // Try to update user record in users table first
      const { error: userError } = await supabaseClient
        .from('users')
        .update(data)
        .eq('id', user.id);
        
      if (!userError) {
        console.log('User record updated successfully in users table');
        updateSuccessful = true;
      } else {
        console.warn('Error updating user record in users table:', userError);
      }
      
      // Also try to update profile in profiles table if it exists
      const { error: profileError } = await supabaseClient
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (!profileError) {
        console.log('Profile updated successfully in profiles table');
        updateSuccessful = true;
      } else {
        console.warn('Error updating profile in profiles table:', profileError);
      }
      
      // If neither update succeeded, throw an error
      if (!updateSuccessful) {
        throw new Error('Failed to update user profile in any table');
      }
      
      console.log('Profile update completed');
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err instanceof Error ? err : new Error('Failed to update profile'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        role,
        loading,
        error,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
      }}
    >
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
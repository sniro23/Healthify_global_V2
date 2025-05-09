'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@healthify/types';

export interface AuthUser extends User {
  id: string;
  email: string;
}

export class SupabaseAuthService {
  private supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string, userData: Partial<User>) {
    return this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  async resetPassword(email: string) {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return this.supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile, error } = await this.supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          callback(null);
          return;
        }

        callback(profile as AuthUser);
      } else {
        callback(null);
      }
    });
  }
} 
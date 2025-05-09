import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(supabaseUrl: string, supabaseKey: string): SupabaseClient {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseInstance;
}

export function clearSupabaseClient(): void {
  supabaseInstance = null;
}

export async function signIn(email: string, password: string, supabase: SupabaseClient) {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signUp(email: string, password: string, supabase: SupabaseClient) {
  return await supabase.auth.signUp({
    email,
    password,
  });
}

export async function signOut(supabase: SupabaseClient) {
  return await supabase.auth.signOut();
}

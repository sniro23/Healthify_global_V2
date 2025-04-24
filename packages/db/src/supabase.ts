import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function createSupabaseClient() {
  if (client) return client;
  
  // In a browser environment, we need the environment variables to be prefixed with NEXT_PUBLIC_
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase URL or API key');
  }
  
  client = createClient(supabaseUrl, supabaseKey);
  return client;
}

// Utility for typing the responses from Supabase
export type { Tables } from './types';

// Re-export for convenience
export { createClient } from '@supabase/supabase-js'; 
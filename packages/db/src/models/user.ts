import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types';

export type User = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];

/**
 * Gets a user by ID
 * @param supabase Supabase client instance
 * @param id User ID
 * @returns The user or null if not found
 */
export async function getUserById(
  supabase: SupabaseClient<Database>,
  id: string
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data;
}

/**
 * Creates a new user
 * @param supabase Supabase client instance
 * @param user User data to insert
 * @returns The created user or null if failed
 */
export async function createUser(
  supabase: SupabaseClient<Database>,
  user: UserInsert
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  if (error) {
    console.error('Error creating user:', error);
    return null;
  }
  
  return data;
}

/**
 * Updates a user
 * @param supabase Supabase client instance
 * @param id User ID
 * @param updates User data to update
 * @returns The updated user or null if failed
 */
export async function updateUser(
  supabase: SupabaseClient<Database>,
  id: string,
  updates: UserUpdate
): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating user:', error);
    return null;
  }
  
  return data;
}

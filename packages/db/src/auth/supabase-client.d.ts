import type { SupabaseClient } from '@supabase/supabase-js';
export declare function getSupabaseClient(supabaseUrl: string, supabaseKey: string): SupabaseClient;
export declare function clearSupabaseClient(): void;
export declare function signIn(email: string, password: string, supabase: SupabaseClient): Promise<import("@supabase/supabase-js").AuthTokenResponsePassword>;
export declare function signUp(email: string, password: string, supabase: SupabaseClient): Promise<import("@supabase/supabase-js").AuthResponse>;
export declare function signOut(supabase: SupabaseClient): Promise<{
    error: import("@supabase/supabase-js").AuthError | null;
}>;
//# sourceMappingURL=supabase-client.d.ts.map
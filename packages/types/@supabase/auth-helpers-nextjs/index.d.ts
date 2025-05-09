declare module '@supabase/auth-helpers-nextjs' {
  import { SupabaseClient, User, Session } from '@supabase/supabase-js';
  import { NextApiRequest, NextApiResponse } from 'next';
  import { NextRequest, NextResponse } from 'next/server';
  import { RequestCookies, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
  
  // Server client
  export function createServerSupabaseClient<Database = any>(
    context: {
      req: NextApiRequest | NextRequest | Request;
      res?: NextApiResponse | NextResponse | Response;
      headers?: Headers | RequestCookies | ResponseCookies;
    },
    options?: {
      supabaseUrl?: string;
      supabaseKey?: string;
      options?: {
        auth?: {
          autoRefreshToken?: boolean;
          persistSession?: boolean;
          detectSessionInUrl?: boolean;
        };
        global?: {
          headers?: Record<string, string>;
          fetch?: typeof fetch;
        };
      };
    }
  ): SupabaseClient<Database>;
  
  // Route handler client
  export function createRouteHandlerClient<Database = any>(
    params: {
      cookies: () => RequestCookies;
    },
    options?: {
      supabaseUrl?: string;
      supabaseKey?: string;
      options?: {
        auth?: {
          autoRefreshToken?: boolean;
          persistSession?: boolean;
          detectSessionInUrl?: boolean;
        };
        global?: {
          headers?: Record<string, string>;
          fetch?: typeof fetch;
        };
      };
    }
  ): SupabaseClient<Database>;
  
  // Browser client
  export function createBrowserSupabaseClient<Database = any>(
    options?: {
      supabaseUrl?: string;
      supabaseKey?: string;
      options?: {
        auth?: {
          autoRefreshToken?: boolean;
          persistSession?: boolean;
          detectSessionInUrl?: boolean;
        };
        global?: {
          headers?: Record<string, string>;
          fetch?: typeof fetch;
        };
      };
    }
  ): SupabaseClient<Database>;
  
  // Middleware client
  export function createMiddlewareSupabaseClient<Database = any>(
    context: {
      req: NextRequest;
      res: NextResponse;
    },
    options?: {
      supabaseUrl?: string;
      supabaseKey?: string;
      options?: {
        auth?: {
          autoRefreshToken?: boolean;
          persistSession?: boolean;
          detectSessionInUrl?: boolean;
        };
        global?: {
          headers?: Record<string, string>;
          fetch?: typeof fetch;
        };
      };
    }
  ): SupabaseClient<Database>;

  // Auth utilities
  export function withApiAuth<
    Database = any,
    Response extends NextApiResponse = NextApiResponse
  >(
    handler: (
      req: NextApiRequest,
      res: Response,
      supabaseClient: SupabaseClient<Database>,
      user: User
    ) => Promise<void> | void
  ): (req: NextApiRequest, res: Response) => Promise<void>;
  
  // Session utilities
  export interface UserContextProps {
    supabaseClient: SupabaseClient;
    isLoading: boolean;
    session: Session | null;
    user: User | null;
    error: Error | null;
  }
  
  export function useUser<Database = any>(): UserContextProps;
  export function useSupabaseClient<Database = any>(): SupabaseClient<Database>;
}

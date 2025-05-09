'use client';

import React, { useState, useEffect } from 'react';
import { AuthProvider } from '../lib/auth/AuthProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

// Environment values - in production these should be set in environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kyckzyggwfhczlcpoikd.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// For TypeScript: add the supabase property to the Window interface
declare global {
  interface Window {
    supabase?: SupabaseClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null);
  const [isClientReady, setIsClientReady] = useState(false);

  // Initialize Supabase client on component mount, but only on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('Initializing Supabase client with URL:', supabaseUrl);
      const client = createClientComponentClient({
        supabaseUrl,
        supabaseKey: supabaseAnonKey,
      });
      
      // Add auth state listener for debugging
      client.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
      });

      // Attach the Supabase client to the window object for global access
      window.supabase = client;
      
      setSupabaseClient(client);
      setIsClientReady(true);
    }
  }, []);

  // Don't render children until Supabase client is ready
  if (!isClientReady || !supabaseClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Initializing...</p>
      </div>
    );
  }

  return (
    <AuthProvider supabaseClient={supabaseClient}>
      {children}
    </AuthProvider>
  );
} 
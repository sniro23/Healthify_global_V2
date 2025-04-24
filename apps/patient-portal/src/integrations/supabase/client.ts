import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://kyckzyggwfhczlcpoikd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5Y2t6eWdnd2ZoY3psY3BvaWtkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU0Njg2NjcsImV4cCI6MjA2MTA0NDY2N30.okQJnmPS4OEXGFzPrPOYYKIVPX9TRpQEQJvYUGj9UjU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY); 
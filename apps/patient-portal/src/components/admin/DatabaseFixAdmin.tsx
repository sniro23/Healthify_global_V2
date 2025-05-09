import { useState } from 'react';
import { applyDatabaseFixes } from '../../lib/db/applyDatabaseFixes';

/**
 * Admin component that provides an interface for administrators
 * to apply database fixes to resolve RLS policy issues
 */
export const DatabaseFixAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const handleApplyFixes = async () => {
    setLoading(true);
    setResult({});
    
    try {
      const fixResult = await applyDatabaseFixes();
      setResult(fixResult);
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : String(error)
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Database Administration</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">RLS Policy Fixes</h3>
        <p className="text-gray-600 mb-4">
          This tool will apply fixes to Row Level Security (RLS) policies in the database.
          It will correct permissions for the users and profiles tables to ensure proper access control.
        </p>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={handleApplyFixes}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-white ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Applying Fixes...' : 'Apply Database Fixes'}
          </button>
          
          {result.message && (
            <div
              className={`p-3 rounded-md ${
                result.success
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {result.message}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-medium mb-2">Manual SQL Execution</h3>
        <p className="text-gray-600 mb-2">
          For advanced users only. You can manually run the SQL commands below in the Supabase SQL editor:
        </p>
        
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          {`-- Ensure RLS is enabled on the tables
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;

-- Grant permissions to authenticated and anonymous users
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.users TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.profiles TO authenticated;
GRANT SELECT ON TABLE public.users TO anon;
GRANT SELECT ON TABLE public.profiles TO anon;

-- Create public SELECT policies (allowing anyone to read)
CREATE POLICY "Anyone can select users"
ON public.users FOR SELECT TO public USING (true);

CREATE POLICY "Anyone can select profiles"
ON public.profiles FOR SELECT TO public USING (true);

-- Create RLS Policies for updates (only own data)
CREATE POLICY "Users can update own user data"
ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile data"
ON public.profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Create RLS Policies for inserts (only own data)
CREATE POLICY "Users can insert own user data"
ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile data"
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);`}
        </pre>
      </div>
    </div>
  );
}; 
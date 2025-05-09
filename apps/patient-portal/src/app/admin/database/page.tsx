import { PageContainer } from '../../../components/layout/PageContainer';
import { DatabaseFixAdmin } from '../../../components/admin/DatabaseFixAdmin';
import Link from 'next/link';

export default function DatabaseAdminPage() {
  return (
    <PageContainer title="Database Administration">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link 
            href="/admin"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Admin
          </Link>
        </div>
        
        <p className="text-gray-600">
          Welcome to the database administration page. Here you can manage database settings and apply fixes to resolve
          permission issues with the Supabase database.
        </p>
        
        <DatabaseFixAdmin />
        
        <div className="mt-8 bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-lg font-medium text-blue-800 mb-2">Understanding Database Issues</h3>
          <p className="text-blue-700 mb-2">
            If you're experiencing 403 Forbidden errors when accessing user profiles, this is likely due to
            Row Level Security (RLS) policies not being correctly configured in your Supabase database.
          </p>
          <p className="text-blue-700">
            The tool above will help you fix these issues by creating the necessary RLS policies for
            both the profiles and users tables, ensuring proper access control while maintaining security.
          </p>
        </div>
      </div>
    </PageContainer>
  );
} 
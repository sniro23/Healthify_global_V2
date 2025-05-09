import { PageContainer } from '../../components/layout/PageContainer';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <PageContainer title="Administration Dashboard">
      <div className="space-y-8">
        <p className="text-gray-600">
          Welcome to the administration dashboard. Use the tools below to manage various aspects of the system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Database Administration Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg 
                className="w-8 h-8 text-blue-600 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
              <h3 className="text-xl font-semibold">Database Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage database settings, apply RLS policy fixes, and resolve permission issues.
            </p>
            <Link 
              href="/admin/database" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Access Tools
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* User Management Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg 
                className="w-8 h-8 text-green-600 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-semibold">User Management</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Manage user accounts, roles, and permissions across the system.
            </p>
            <Link 
              href="#" 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Coming Soon
            </Link>
          </div>
          
          {/* System Settings Card */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <svg 
                className="w-8 h-8 text-purple-600 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xl font-semibold">System Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configure application settings, environment variables, and system parameters.
            </p>
            <Link 
              href="#" 
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Coming Soon
            </Link>
          </div>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-4 rounded-md border border-yellow-200">
          <h3 className="text-lg font-medium text-yellow-800 mb-2">Administrator Access</h3>
          <p className="text-yellow-700">
            These tools are intended for system administrators only. Changes made here will affect the entire system.
            Please proceed with caution and ensure you understand the implications of any changes.
          </p>
        </div>
      </div>
    </PageContainer>
  );
} 
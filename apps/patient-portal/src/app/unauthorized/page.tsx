import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized - Healthify',
  description: 'You do not have permission to access this page',
};

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Access Denied
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            You do not have permission to access this page.
            Please contact your administrator if you believe this is an error.
          </p>
        </div>
        
        <div className="text-center">
          <Link
            href="/dashboard"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Return to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 
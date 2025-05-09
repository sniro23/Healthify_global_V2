"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../lib/auth/AuthProvider';

export default function HomePage() {
  const router = useRouter();
  const { user, loading, error } = useAuth();

  React.useEffect(() => {
    if (!loading) {
      if (user) {
        console.log('User is authenticated, redirecting to dashboard');
        router.push('/dashboard');
      } else {
        console.log('No user found, showing auth options');
        // We'll show login/register options instead of auto-redirecting
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            Authentication Error
          </h2>
          <p className="text-sm text-red-600 mb-4">
            {error.message || 'Failed to load user data'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If user is not logged in, show landing page with auth options
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Healthify</h1>
            <p className="text-gray-600">Your health, simplified.</p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/login" 
              className="block w-full text-center py-3 px-4 bg-[#9D5A8F] hover:bg-[#8D4A7F] text-white font-medium rounded-md transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="block w-full text-center py-3 px-4 border border-[#9D5A8F] text-[#9D5A8F] hover:bg-[#F9F5F8] font-medium rounded-md transition-colors"
            >
              Register
            </Link>
          </div>
          
          <div className="pt-4 text-center">
            <p className="text-sm text-gray-500">
              Need help? <a href="#" className="text-[#9D5A8F] hover:underline">Contact support</a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
} 
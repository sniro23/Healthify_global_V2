'use client';

import React from 'react';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:p-10">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
            
            <div className="mx-auto w-20 h-20 flex items-center justify-center mb-6 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <p className="text-gray-600 mb-6">
              We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
            
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn't receive an email? Check your spam folder or
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button 
                  className="btn-secondary inline-flex items-center justify-center px-4 py-2 border border-[#9D5A8F] text-sm font-medium rounded-md text-[#9D5A8F] hover:bg-[#F9F5F8]"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </button>
                <Link 
                  href="/login"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#9D5A8F] hover:bg-[#8D4A7F]"
                >
                  Back to login
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 sm:px-10">
          <p className="text-xs text-center text-gray-500">
            Need help? Contact our support team at <a href="mailto:support@healthify.com" className="font-medium text-[#9D5A8F] hover:text-[#8D4A7F]">support@healthify.com</a>
          </p>
        </div>
      </div>
    </div>
  );
} 
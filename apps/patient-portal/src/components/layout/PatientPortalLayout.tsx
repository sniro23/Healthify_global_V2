'use client';

import React, { useCallback, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../lib/auth/AuthProvider';
import { SideNavigation } from './SideNavigation';
import { BottomNav } from '@healthify/ui-kit';
import Link from 'next/link';
import { NotificationCenter } from '../../components/notifications/NotificationCenter';
import { ResponsiveLayout } from './ResponsiveLayout';
import { ResponsiveNav } from '../navigation/ResponsiveNav';
import { mainNavigation, secondaryNavigation } from '../../config/navigation';
import { LoadingSpinner } from '../../components/ui/LoadingSpinner';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';

interface PatientPortalLayoutProps {
  children: ReactNode;
}

export function PatientPortalLayout({ children }: PatientPortalLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, error, signOut } = useAuth();

  useEffect(() => {
    // Check authentication
    if (!loading && !user) {
      console.log('PatientPortalLayout: No user found, redirecting to login');
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    console.log('PatientPortalLayout: Logging out');
    try {
      await signOut();
      console.log('PatientPortalLayout: Logout successful, redirecting to login');
      router.push('/login');
    } catch (error) {
      console.error('PatientPortalLayout: Logout error', error);
      router.push('/login');
    }
  }, [signOut, router]);

  // Navigation items for the bottom bar
  const navItems = [
    { 
      label: 'Home', 
      href: '/dashboard', 
      isActive: pathname === '/dashboard',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    { 
      label: 'Appointments', 
      href: '/appointments', 
      isActive: pathname === '/appointments',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      label: 'Records', 
      href: '/records', 
      isActive: pathname === '/records',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    { 
      label: 'Profile', 
      href: '/profile', 
      isActive: pathname === '/profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Please Sign In
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            You need to be signed in to access the patient portal
          </p>
          <button
            onClick={() => window.location.href = '/auth/signin'}
            className="px-4 py-2 bg-primary-100 text-primary-800 rounded-md hover:bg-primary-200 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const header = (
    <div className="flex items-center justify-between h-16 px-4">
      <h1 className="text-xl font-semibold text-gray-900">Patient Portal</h1>
      <div className="flex items-center space-x-4">
        <NotificationCenter />
        <ResponsiveNav items={secondaryNavigation} />
      </div>
    </div>
  );

  return (
    <ErrorBoundary>
      <ResponsiveLayout
        header={header}
        sidebar={<ResponsiveNav items={mainNavigation} />}
      >
        {children}
      </ResponsiveLayout>
    </ErrorBoundary>
  );
} 
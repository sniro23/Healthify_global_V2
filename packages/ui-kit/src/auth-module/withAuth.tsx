'use client';

import * as React from 'react';
import { useAuth } from './AuthProvider';
import type { User } from '@healthify/types';

interface WithAuthProps {
  user: User | null;
  isLoading: boolean;
}

export function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: Omit<P, keyof WithAuthProps>) {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as P)} user={user} isLoading={isLoading} />;
  };
} 
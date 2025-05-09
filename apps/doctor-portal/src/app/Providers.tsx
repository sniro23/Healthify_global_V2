'use client';

import React from 'react';
import { AuthProvider } from '@healthify/ui-kit/auth-module';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
} 
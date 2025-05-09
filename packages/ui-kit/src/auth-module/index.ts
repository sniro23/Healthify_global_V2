'use client';

import { AuthProvider } from './AuthProvider';
import { useAuth } from './useAuth';

// Export individual components and hooks
export { AuthProvider } from './AuthProvider';
export { useAuth } from './useAuth';

// Export as a module for compatibility
export const authModule = {
  AuthProvider,
  useAuth,
} as const; 
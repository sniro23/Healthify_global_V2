import React from 'react';
import { SupabaseAuthService, AuthUser } from './supabaseAuthService';
export interface AuthContextState {
    user: AuthUser | null;
    loading: boolean;
    error: Error | null;
}
export interface AuthProviderProps {
    children: React.ReactNode;
    authService: SupabaseAuthService;
}
export declare const AuthProvider: React.FC<AuthProviderProps>;
export declare const useAuth: () => AuthContextState;
//# sourceMappingURL=AuthContext.d.ts.map
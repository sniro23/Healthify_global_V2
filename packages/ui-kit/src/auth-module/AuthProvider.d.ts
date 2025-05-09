import React, { ReactNode } from 'react';
import type { User } from '@healthify/types';
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}
export declare function useAuth(): AuthContextType;
interface AuthProviderProps {
    children: ReactNode;
}
export declare function AuthProvider({ children }: AuthProviderProps): React.JSX.Element;
export {};
//# sourceMappingURL=AuthProvider.d.ts.map
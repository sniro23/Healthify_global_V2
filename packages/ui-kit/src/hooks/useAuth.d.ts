import type { User } from '@healthify/types';
interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: Error | null;
}
interface UseAuthHookReturn extends AuthState {
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateProfile: (data: Partial<User>) => Promise<void>;
}
export declare function useAuthHook(): UseAuthHookReturn;
export {};
//# sourceMappingURL=useAuth.d.ts.map
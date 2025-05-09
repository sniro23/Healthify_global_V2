import type { User } from '@healthify/types';
export interface AuthUser extends User {
    id: string;
    email: string;
}
export declare class SupabaseAuthService {
    private supabase;
    signIn(email: string, password: string): Promise<any>;
    signUp(email: string, password: string, userData: Partial<User>): Promise<any>;
    signOut(): Promise<any>;
    resetPassword(email: string): Promise<any>;
    getSession(): Promise<any>;
    onAuthStateChange(callback: (user: AuthUser | null) => void): any;
}
//# sourceMappingURL=supabaseAuthService.d.ts.map
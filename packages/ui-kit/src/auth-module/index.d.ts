import { AuthProvider } from './AuthProvider';
import { useAuth } from './useAuth';
import { withAuth } from './withAuth';
import { SupabaseAuthService } from './supabaseAuthService';
export type { AuthUser } from './supabaseAuthService';
export { AuthProvider, useAuth, withAuth, SupabaseAuthService };
export declare const authModule: {
    readonly AuthProvider: typeof AuthProvider;
    readonly useAuth: typeof useAuth;
    readonly withAuth: typeof withAuth;
    readonly SupabaseAuthService: typeof SupabaseAuthService;
};
//# sourceMappingURL=index.d.ts.map
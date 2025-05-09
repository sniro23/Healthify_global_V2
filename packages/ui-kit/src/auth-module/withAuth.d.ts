import React from 'react';
import type { User } from '@healthify/types';
interface WithAuthProps {
    user: User | null;
    isLoading: boolean;
}
export declare function withAuth<P extends WithAuthProps>(WrappedComponent: React.ComponentType<P>): (props: Omit<P, keyof WithAuthProps>) => React.JSX.Element;
export {};
//# sourceMappingURL=withAuth.d.ts.map
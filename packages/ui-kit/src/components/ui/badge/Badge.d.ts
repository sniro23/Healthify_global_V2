import React from 'react';
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning';
    className?: string;
}
export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Badge.d.ts.map
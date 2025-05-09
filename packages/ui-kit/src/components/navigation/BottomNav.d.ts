import React from 'react';
interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}
interface BottomNavProps {
    items: NavItem[];
    className?: string;
}
export declare function BottomNav({ items, className }: BottomNavProps): React.JSX.Element;
export {};
//# sourceMappingURL=BottomNav.d.ts.map
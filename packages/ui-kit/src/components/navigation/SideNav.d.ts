import React from 'react';
interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}
interface NavGroupItem {
    label: string;
    items: NavItem[];
}
interface SideNavProps {
    groups: NavGroupItem[];
    className?: string;
    logo?: React.ReactNode;
    footerItems?: NavItem[];
}
export declare function SideNav({ groups, className, logo, footerItems }: SideNavProps): React.JSX.Element;
export {};
//# sourceMappingURL=SideNav.d.ts.map
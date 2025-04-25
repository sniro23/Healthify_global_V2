'use client';

import React from 'react';
import { cn } from '../utils';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
  onClick?: () => void;
}

interface SideNavProps {
  items: NavItem[];
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
}

export function SideNav({ items, className, header, footer, collapsed = false }: SideNavProps) {
  return (
    <div className={cn(
      "flex flex-col h-full border-r border-gray-200 bg-white",
      collapsed ? "w-16" : "w-64",
      className
    )}>
      {header && (
        <div className="p-4 border-b border-gray-200">
          {header}
        </div>
      )}
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {items.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
                className={cn(
                  "flex items-center p-2 rounded-md",
                  collapsed ? "justify-center" : "gap-3",
                  item.isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <div>{item.icon}</div>
                {!collapsed && <span>{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      {footer && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
} 
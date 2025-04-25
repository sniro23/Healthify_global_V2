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

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-center justify-around p-2",
      className
    )}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault();
              item.onClick();
            }
          }}
          className={cn(
            "flex flex-col items-center justify-center p-2 flex-1 text-sm",
            item.isActive 
              ? "text-blue-600" 
              : "text-gray-600 hover:text-blue-600"
          )}
        >
          <div className="mb-1">{item.icon}</div>
          <span>{item.label}</span>
        </a>
      ))}
    </div>
  );
} 
'use client';

import * as React from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

interface BottomNavProps {
  items: NavItem[];
  className?: string;
}

export function BottomNav({ items, className = '' }: BottomNavProps) {
  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 ${className}`}>
      <div className="flex justify-around">
        {items.map((item, index) => {
          return (
            <a 
              key={index}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] ${
                item.isActive ? 'text-[#9D5A8F]' : 'text-gray-500'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge != null && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
} 
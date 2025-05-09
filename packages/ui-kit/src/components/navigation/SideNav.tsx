'use client';

import * as React from 'react';

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

export function SideNav({ groups, className = '', logo, footerItems }: SideNavProps) {
  return (
    <div className={`flex flex-col h-full bg-white border-r border-gray-200 ${className}`}>
      {logo && (
        <div className="p-4 border-b border-gray-100">
          {logo}
        </div>
      )}
      
      <div className="flex-grow overflow-y-auto p-4">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-6">
            <h3 className="text-xs uppercase font-semibold text-gray-400 mb-2 px-2">
              {group.label}
            </h3>
            <div className="space-y-1">
              {group.items.map((item, itemIndex) => {
                const isActive = window.location.pathname === item.href || 
                                window.location.pathname?.startsWith(`${item.href}/`);
                
                return (
                  <a 
                    key={itemIndex}
                    href={item.href}
                    className={`flex items-center px-2 py-2 rounded-md ${
                      isActive 
                        ? 'bg-health-highlight text-health-primary font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <div className="mr-3">
                      {item.icon}
                    </div>
                    <span>{item.label}</span>
                    {item.badge != null && item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
                        {item.badge > 99 ? '99+' : item.badge}
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {footerItems && (
        <div className="p-4 border-t border-gray-100">
          {footerItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className="flex items-center px-2 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
            >
              <div className="mr-3">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
} 
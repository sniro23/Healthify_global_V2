'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, FileText, MessageSquare, Users, 
  Settings, LogOut, User
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: Home },
  { name: 'Appointments', path: '/appointments', icon: Calendar },
  { name: 'Patients', path: '/patients', icon: Users },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Records', path: '/records', icon: FileText },
  { name: 'Profile', path: '/profile', icon: User },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-health-primary">Healthify</span>
            <span className="text-xs bg-health-primary text-white px-1.5 rounded ml-1">MD</span>
          </Link>
        </div>
        
        <div className="p-4 flex items-center space-x-3 border-b">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-health-primary font-medium">
            DS
          </div>
          <div>
            <p className="font-medium">Dr. Sarah Jones</p>
            <p className="text-xs text-gray-500">Cardiologist</p>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              const IconComponent = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive 
                        ? "bg-health-primary/10 text-health-primary font-medium" 
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className={`h-5 w-5 mr-3 ${isActive ? "text-health-primary" : "text-gray-500"}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Link
            href="/settings"
            className="flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5 mr-3 text-gray-500" />
            Settings
          </Link>
          <button
            className="flex w-full items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut className="h-5 w-5 mr-3 text-gray-500" />
            Sign Out
          </button>
        </div>
      </aside>
      
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  );
} 
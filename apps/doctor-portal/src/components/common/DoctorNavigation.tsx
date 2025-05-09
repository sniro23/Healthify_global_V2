'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, Calendar, FileText, MessageSquare, Users, 
  Settings, LogOut
} from "lucide-react";

const navItems = [
  { 
    name: "Dashboard", 
    path: "/dashboard", 
    icon: Home 
  },
  { 
    name: "Appointments", 
    path: "/appointments", 
    icon: Calendar 
  },
  { 
    name: "Prescriptions", 
    path: "/prescriptions", 
    icon: FileText 
  },
  { 
    name: "Messages", 
    path: "/messages", 
    icon: MessageSquare 
  },
  { 
    name: "Patients", 
    path: "/patients", 
    icon: Users 
  },
];

export default function DoctorNavigation() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
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
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path || pathname?.startsWith(`${item.path}/`);
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
      
      <div className="p-4 border-t">
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
  );
} 
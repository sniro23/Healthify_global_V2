
import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Activity, Calendar, Heart, MessageCircle, User, 
  HelpCircle, Settings, Bell, LogOut, Pill, TestTube 
} from "lucide-react";
import { Button, Avatar, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: 'Patient Portal | Healthify',
  description: 'Manage your health records and appointments',
};

const SidebarItem = ({ 
  href, 
  icon: Icon, 
  children, 
  isActive 
}: { 
  href: string; 
  icon: React.ComponentType<any>; 
  children: React.ReactNode;
  isActive?: boolean;
}) => {
  return (
    <Link href={href} className="w-full">
      <div className={`
        flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors
        ${isActive 
          ? "bg-[var(--health-primary)] text-white" 
          : "text-gray-700 hover:bg-[var(--health-primary)/10]"}
      `}>
        <Icon className="h-5 w-5 mr-2" />
        {children}
      </div>
    </Link>
  );
};

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const subscription = {
    tier: "Category B"
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="hidden md:block w-64 bg-[var(--health-highlight)] border-r border-gray-200">
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2 !bg-transparent">
              <img
                src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
                alt="Healthify Icon"
                className="h-8 w-8"
              />
            </Avatar>
            <div className="flex flex-col">
              <img
                src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
                alt="Healthify Logo"
                className="h-8 w-auto mb-1"
                style={{ maxWidth: 120 }}
              />
              <div className="flex items-center">
                <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-health-highlight text-health-primary border-health-primary">
                  {subscription.tier}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <SidebarItem href="/patient" icon={Activity}>Dashboard</SidebarItem>
          <SidebarItem href="/patient/appointments" icon={Calendar}>Appointments</SidebarItem>
          <SidebarItem href="/patient/records" icon={Heart}>Health Records</SidebarItem>
          <SidebarItem href="/patient/records/labs" icon={TestTube}>Lab Reports</SidebarItem>
          <SidebarItem href="/patient/messages" icon={MessageCircle}>Messages</SidebarItem>
          <SidebarItem href="/patient/prescriptions" icon={Pill}>Prescriptions</SidebarItem>
          <SidebarItem href="/patient/profile" icon={User}>Profile</SidebarItem>
          <SidebarItem href="/patient/payment-settings" icon={Settings}>Payment Settings</SidebarItem>
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
          <Link href="/" className="w-full block">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
              alt="Healthify Icon"
              className="h-6 w-6 mr-2"
            />
            <img
              src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
              alt="Healthify Logo"
              className="h-5 w-auto"
              style={{ maxWidth: 100 }}
            />
          </div>
          <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-health-highlight text-health-primary border-health-primary">
            {subscription.tier}
          </Badge>
        </div>

        {children}
        
        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
          <Link href="/patient">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
              <Activity className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
          </Link>
          <Link href="/patient/appointments">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Appointments</span>
            </Button>
          </Link>
          <Link href="/patient/records">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
              <Heart className="h-5 w-5" />
              <span className="text-xs mt-1">Records</span>
            </Button>
          </Link>
          <Link href="/patient/profile">
            <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}

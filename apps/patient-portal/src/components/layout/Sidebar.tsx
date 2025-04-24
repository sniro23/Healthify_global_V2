import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, Calendar, Heart, MessageCircle, User, 
  HelpCircle, Settings, LogOut, Pill, TestTube 
} from "lucide-react";
import { Button, Avatar, Badge } from "@healthify/ui-kit";

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon: Icon, 
  children, 
  isActive 
}) => {
  return (
    <Link to={to} className="w-full">
      <div className={`
        flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-pointer transition-colors
        ${isActive 
          ? "bg-health-primary text-white" 
          : "text-gray-700 hover:bg-health-primary/10"}
      `}>
        <Icon className="h-5 w-5 mr-2" />
        {children}
      </div>
    </Link>
  );
};

interface SidebarProps {
  activePath?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePath = '' }) => {
  const subscription = {
    tier: "Category B"
  };

  return (
    <div className="hidden md:block w-64 bg-health-highlight border-r border-gray-200">
      <div className="h-16 flex items-center px-4 border-b border-gray-200">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2 bg-transparent">
            <img
              src="/images/logo-icon.png"
              alt="Healthify Icon"
              className="h-8 w-8"
            />
          </Avatar>
          <div className="flex flex-col">
            <img
              src="/images/logo.png"
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
        <SidebarItem to="/patient" icon={Activity} isActive={activePath === '/patient'}>Dashboard</SidebarItem>
        <SidebarItem to="/patient/appointments" icon={Calendar} isActive={activePath.startsWith('/patient/appointments')}>Appointments</SidebarItem>
        <SidebarItem to="/patient/records" icon={Heart} isActive={activePath === '/patient/records'}>Health Records</SidebarItem>
        <SidebarItem to="/patient/records/labs" icon={TestTube} isActive={activePath === '/patient/records/labs'}>Lab Reports</SidebarItem>
        <SidebarItem to="/patient/messages" icon={MessageCircle} isActive={activePath === '/patient/messages'}>Messages</SidebarItem>
        <SidebarItem to="/patient/prescriptions" icon={Pill} isActive={activePath === '/patient/prescriptions'}>Prescriptions</SidebarItem>
        <SidebarItem to="/patient/profile" icon={User} isActive={activePath === '/patient/profile'}>Profile</SidebarItem>
        <SidebarItem to="/patient/payment-settings" icon={Settings} isActive={activePath === '/patient/payment-settings'}>Payment Settings</SidebarItem>
      </div>

      <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-200">
        <Link to="/" className="w-full block">
          <Button variant="outline" size="sm" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar; 
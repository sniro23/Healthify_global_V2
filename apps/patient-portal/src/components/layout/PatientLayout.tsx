import React from 'react';
import { Badge } from "@healthify/ui-kit";
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import { useLocation } from 'react-router-dom';

interface PatientLayoutProps {
  children: React.ReactNode;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children }) => {
  const location = useLocation();
  const subscription = {
    tier: "Category B"
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar activePath={location.pathname} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              src="/images/logo-icon.png"
              alt="Healthify Icon"
              className="h-6 w-6 mr-2"
            />
            <img
              src="/images/logo.png"
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
        <MobileNav />
      </main>
    </div>
  );
};

export default PatientLayout; 
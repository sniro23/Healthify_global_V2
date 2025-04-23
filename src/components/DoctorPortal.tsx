
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";
import DoctorSidebar from "./doctor/DoctorSidebar";
import DoctorHeader from "./doctor/DoctorHeader";
import DoctorDashboardContent from "./doctor/DoctorDashboardContent";
import NotificationScreen from "./doctor/NotificationScreen";
import MobileNavigation from "./doctor/MobileNavigation";

export function DoctorPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <DoctorSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        isMobile={isMobile}
      />

      <div className="flex-1 overflow-auto p-0">
        <DoctorHeader
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />

        {location.pathname === '/doctor' && (
          <DoctorDashboardContent />
        )}

        {location.pathname === '/doctor/notifications' && (
          <NotificationScreen />
        )}
      </div>
      
      {isMobile && <MobileNavigation />}
    </div>
  );
}

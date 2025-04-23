
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
    <div className={`flex h-screen bg-gray-100 ${isMobile ? "flex-col" : ""}`}>
      <DoctorSidebar 
        collapsed={collapsed} 
        setCollapsed={setCollapsed}
        isMobile={isMobile}
      />

      <div className={`flex-1 overflow-auto bg-white flex flex-col min-h-0 ${isMobile ? "pb-20 px-2 pt-2" : "p-3 md:p-6"}`}>
        <DoctorHeader
          isOnline={isOnline}
          setIsOnline={setIsOnline}
        />

        <div className="flex-1 flex flex-col min-h-0">
          {location.pathname === '/doctor' && (
            <DoctorDashboardContent />
          )}

          {location.pathname === '/doctor/notifications' && (
            <NotificationScreen />
          )}
        </div>
      </div>
      
      {isMobile && <MobileNavigation />}
    </div>
  );
}


import React from "react";
import { DoctorPortal } from "@/components/DoctorPortal";
import { NotificationProvider } from '@/contexts/NotificationContext';

const DoctorPortalPage = () => {
  return (
    <NotificationProvider>
      <div className="flex flex-col h-screen">
        <DoctorPortal />
      </div>
    </NotificationProvider>
  );
};

export default DoctorPortalPage;

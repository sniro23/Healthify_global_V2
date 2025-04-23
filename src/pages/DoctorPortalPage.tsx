
import React from "react";
import { DoctorPortal } from "@/components/DoctorPortal";
import { NotificationProvider } from '@/contexts/NotificationContext';
import { Button } from "@/packages/ui-kit";
import Link from 'next/link';
import Image from 'next/image';

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

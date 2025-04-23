
import React from 'react';
import { NotificationProvider } from '@/contexts/NotificationContext';
import DoctorPortalPage from '../../DoctorPortalPage';

export default function NotificationsPage() {
  return (
    <NotificationProvider>
      <DoctorPortalPage />
    </NotificationProvider>
  );
}


import React, { createContext, useContext, useState, useEffect } from 'react';
import { Notification, NotificationType } from '@/types/notification';
import { toast } from 'sonner';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  filterNotifications: (type?: NotificationType) => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New appointment request',
    description: 'Sarah Miller has requested a video consultation for tomorrow at 10:00 AM.',
    type: 'Chat',
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
    isRead: false,
    actionUrl: '/doctor/appointments',
    doctorId: 'doctor-123'
  },
  {
    id: '2',
    title: 'Prescription approved',
    description: 'The prescription for John Davis has been approved and sent.',
    type: 'Prescription',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    isRead: true,
    actionUrl: '/doctor/prescriptions',
    doctorId: 'doctor-123'
  },
  {
    id: '3',
    title: 'Payment received',
    description: 'You received a payment of $75.00 for consultation #1234.',
    type: 'Payment',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), // 1 day ago
    isRead: false,
    actionUrl: '/doctor/billing',
    doctorId: 'doctor-123'
  },
  {
    id: '4',
    title: 'System maintenance',
    description: 'The system will undergo maintenance on April 25th from 2:00 AM to 4:00 AM.',
    type: 'System',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    isRead: false,
    doctorId: 'doctor-123'
  },
  {
    id: '5',
    title: 'Profile update required',
    description: 'Please update your professional credentials in your profile.',
    type: 'Admin',
    timestamp: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    isRead: true,
    actionUrl: '/doctor/profile',
    doctorId: 'doctor-123'
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast.info(notification.title, {
      description: notification.description,
      action: notification.actionUrl ? {
        label: 'View',
        onClick: () => window.location.href = notification.actionUrl as string,
      } : undefined,
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const filterNotifications = (type?: NotificationType) => {
    if (!type) return notifications;
    return notifications.filter(notification => notification.type === type);
  };

  // Load notifications from localStorage on component mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('doctorNotifications');
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem('doctorNotifications', JSON.stringify(notifications));
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      clearNotifications,
      filterNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

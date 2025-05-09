import { useState, useEffect, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@healthify/ui-kit/auth-module';
import { useRouter } from 'next/navigation';

export type NotificationType = 
  | 'new_message'
  | 'appointment_reminder'
  | 'appointment_confirmed'
  | 'appointment_cancelled'
  | 'system_update'
  | 'medical_record_update';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  // Handle notification click and navigation
  const handleNotificationClick = useCallback(async (notification: Notification) => {
    await markAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'new_message':
        if (notification.data?.conversation_id) {
          router.push(`/messages/${notification.data.conversation_id}`);
        }
        break;
      case 'appointment_reminder':
      case 'appointment_confirmed':
      case 'appointment_cancelled':
        if (notification.data?.appointment_id) {
          router.push(`/appointments/${notification.data.appointment_id}`);
        } else {
          router.push('/appointments');
        }
        break;
      case 'medical_record_update':
        if (notification.data?.record_id) {
          router.push(`/records/${notification.data.record_id}`);
        } else {
          router.push('/records');
        }
        break;
      case 'system_update':
        // System notifications might not need navigation
        break;
    }
  }, [router]);
  
  // Subscribe to real-time notification updates
  useEffect(() => {
    if (!user) return;

    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newNotification = payload.new as Notification;
            setNotifications(prev => [newNotification, ...prev]);
            setUnreadCount(prev => prev + 1);
            
            // Show browser notification if permission is granted
            if (Notification.permission === 'granted') {
              new Notification(newNotification.title, {
                body: newNotification.message,
                icon: '/favicon.ico'
              });
            }
          } else if (payload.eventType === 'UPDATE') {
            const updatedNotification = payload.new as Notification;
            setNotifications(prev =>
              prev.map(notif =>
                notif.id === updatedNotification.id ? updatedNotification : notif
              )
            );
            if (updatedNotification.is_read) {
              setUnreadCount(prev => Math.max(0, prev - 1));
            }
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, supabase]);
  
  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(50);
          
        if (error) throw error;
        
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.is_read).length);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch notifications'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchNotifications();
  }, [user, supabase]);
  
  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications');
    }
    
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Notification permission denied');
    }
  }, []);
  
  // Mark notification as read
  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);
        
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark notification as read'));
    }
  }, [user, supabase]);
  
  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);
        
      if (error) throw error;
      
      setNotifications(prev =>
        prev.map(notif => ({ ...notif, is_read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to mark all notifications as read'));
    }
  }, [user, supabase]);
  
  // Create a new notification
  const createNotification = useCallback(async (
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, any>
  ) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('notifications')
        .insert([{
          user_id: user.id,
          type,
          title,
          message,
          data
        }]);
        
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create notification'));
    }
  }, [user, supabase]);

  // Create appointment reminder
  const createAppointmentReminder = useCallback(async (
    appointmentId: string,
    appointmentTime: Date,
    doctorName: string
  ) => {
    await createNotification(
      'appointment_reminder',
      'Upcoming Appointment',
      `You have an appointment with Dr. ${doctorName} in 24 hours`,
      {
        appointment_id: appointmentId,
        appointment_time: appointmentTime.toISOString(),
        doctor_name: doctorName
      }
    );
  }, [createNotification]);

  // Create medical record update notification
  const createMedicalRecordUpdate = useCallback(async (
    recordId: string,
    recordType: string,
    updateType: 'added' | 'updated' | 'deleted'
  ) => {
    await createNotification(
      'medical_record_update',
      'Medical Record Update',
      `Your ${recordType} has been ${updateType}`,
      {
        record_id: recordId,
        record_type: recordType,
        update_type: updateType
      }
    );
  }, [createNotification]);

  // Create system update notification
  const createSystemUpdate = useCallback(async (
    title: string,
    message: string
  ) => {
    await createNotification(
      'system_update',
      title,
      message
    );
  }, [createNotification]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    requestPermission,
    markAsRead,
    markAllAsRead,
    handleNotificationClick,
    createNotification,
    createAppointmentReminder,
    createMedicalRecordUpdate,
    createSystemUpdate
  };
}; 
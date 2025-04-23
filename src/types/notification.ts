
export type NotificationType = 'System' | 'Chat' | 'Payment' | 'Admin' | 'Prescription';

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: NotificationType;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
  doctorId: string;
}

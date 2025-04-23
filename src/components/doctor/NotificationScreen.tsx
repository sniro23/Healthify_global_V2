import React, { useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { NotificationType } from '@/types/notification';
import { Button, Card, Badge } from '@/packages/ui-kit';
import { useRouter } from 'next/router';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Bell, 
  MessageCircle, 
  DollarSign, 
  ShieldAlert, 
  PillIcon
} from 'lucide-react';

export const NotificationScreen: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    filterNotifications 
  } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<NotificationType | 'All'>('All');
  const router = useRouter();

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id);
    if (actionUrl) {
      router.push(actionUrl);
    }
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'Chat':
        return <MessageCircle className="h-5 w-5 text-health-accent" />;
      case 'Payment':
        return <DollarSign className="h-5 w-5 text-green-600" />;
      case 'Admin':
        return <ShieldAlert className="h-5 w-5 text-yellow-600" />;
      case 'Prescription':
        return <PillIcon className="h-5 w-5 text-health-primary" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'Chat':
        return 'bg-health-accent text-white';
      case 'Payment':
        return 'bg-green-600 text-white';
      case 'Admin':
        return 'bg-yellow-600 text-white';
      case 'Prescription':
        return 'bg-health-primary text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  const displayedNotifications = activeFilter === 'All' 
    ? notifications 
    : filterNotifications(activeFilter as NotificationType);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // If it's today, show relative time (e.g., "2 hours ago")
    if (date.toDateString() === now.toDateString()) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    // Otherwise, show the actual date
    return format(date, 'MMM d, yyyy h:mm a');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(['All', 'System', 'Chat', 'Payment', 'Admin', 'Prescription'] as const).map((filter) => (
          <Button 
            key={filter}
            variant={activeFilter === filter ? "health" : "outline"}
            size="sm"
            onClick={() => setActiveFilter(filter)}
            className="rounded-full"
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {displayedNotifications.length === 0 ? (
          <Card className="p-8 text-center text-gray-500">
            No notifications to display
          </Card>
        ) : (
          displayedNotifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${notification.isRead ? 'border-gray-200' : 'border-health-primary border-l-4'}`}
              onClick={() => handleNotificationClick(notification.id, notification.actionUrl)}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-medium ${notification.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    <Badge className={`${getTypeColor(notification.type)}`}>
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                  <p className="text-xs text-gray-400 mt-2">{formatTimestamp(notification.timestamp)}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationScreen;

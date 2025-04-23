
import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';
import { Button } from '@/packages/ui-kit';
import { Badge } from '@/packages/ui-kit';
import { useNavigate } from 'react-router-dom';

export const NotificationBell: React.FC = () => {
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/doctor/notifications');
  };

  return (
    <Button 
      variant="ghost" 
      onClick={handleClick}
      className="relative p-2"
    >
      <Bell className="h-5 w-5" />
      {unreadCount > 0 && (
        <Badge 
          variant="health" 
          className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center p-0 text-[0.65rem]"
        >
          {unreadCount > 99 ? '99+' : unreadCount}
        </Badge>
      )}
    </Button>
  );
};

export default NotificationBell;

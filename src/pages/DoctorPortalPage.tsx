
import React from "react";
import { DoctorPortal } from "@/components/doctor/DoctorPortal";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Bell, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { useNotifications } from "@/contexts/NotificationContext";

const DoctorPortalPage = () => {
  const [isOnline, setIsOnline] = React.useState(true);
  const location = useLocation();
  const { unreadCount } = useNotifications();

  const getTitle = () => {
    switch (location.pathname) {
      case '/doctor': return 'Dashboard';
      case '/doctor/patients': return 'Patients';
      case '/doctor/appointments': return 'Appointments';
      case '/doctor/messages': return 'Messages';
      case '/doctor/prescriptions': return 'Prescriptions';
      case '/doctor/notifications': return 'Notifications';
      case '/doctor/profile': return 'Profile';
      case '/doctor/settings': return 'Settings';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-health-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">{getTitle()}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center mr-2">
            <span className={`mr-2 text-sm ${isOnline ? 'text-green-200' : 'text-gray-300'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-10 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
                isOnline ? 'bg-green-500 justify-end' : 'bg-gray-500 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
            </button>
          </div>
          
          <Link to="/doctor/notifications" className="relative">
            <Button variant="ghost" className="text-white hover:bg-white/20 p-2">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Link to="/doctor/profile">
            <Button variant="ghost" className="text-white hover:bg-white/20 p-1">
              <Avatar className="h-8 w-8">
                <User className="h-5 w-5" />
              </Avatar>
            </Button>
          </Link>
          
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1 min-h-0">
        <DoctorPortal />
      </div>
    </div>
  );
};

export default DoctorPortalPage;

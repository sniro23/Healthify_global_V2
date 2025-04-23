
import React from "react";
import { Avatar, Badge, Button } from "@/packages/ui-kit";
import NotificationBell from "./NotificationBell";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface DoctorHeaderProps {
  isOnline: boolean;
  setIsOnline: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({ isOnline, setIsOnline }) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case '/doctor': return 'Dashboard';
      case '/doctor/patients': return 'Patients';
      case '/doctor/appointments': return 'Appointments';
      case '/doctor/consultations': return 'Consultations';
      case '/doctor/prescriptions': return 'Prescriptions';
      case '/doctor/notifications': return 'Notifications';
      case '/doctor/settings': return 'Settings';
      default: return '';
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center">
          {isMobile && (
            <img 
              src="/lovable-uploads/31616087-bfd6-4911-96a7-6815ec19ce8d.png"
              alt="Healthify Logo"
              className="h-8 w-8 mr-2"
            />
          )}
          <h2 className="text-xl font-semibold text-gray-900">
            {getTitle()}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-4">
            <span className={`mr-2 ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
                isOnline ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
            </button>
          </div>
          
          <NotificationBell />
          
          <Avatar 
            className="ml-2 cursor-pointer"
            onClick={() => window.location.href = '/doctor/profile'}
          >
            <span>DR</span>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;


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
      <div className="flex justify-between items-center px-3 py-2 md:px-6 md:py-4">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
            alt="Healthify Logo"
            className="h-8 w-auto mr-2 block md:hidden"
            style={{ maxWidth: 110 }}
          />
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 truncate">{getTitle()}</h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center mr-2 md:mr-4">
            <span className={`mr-2 text-xs md:text-base ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button 
              onClick={() => setIsOnline(!isOnline)}
              className={`w-10 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
                isOnline ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
            </button>
          </div>
          <NotificationBell />
          <Avatar 
            className="ml-2 cursor-pointer hidden md:flex bg-health-highlight text-health-primary"
            onClick={() => window.location.href = '/doctor/profile'}
          >
            <img
              src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
              alt="Healthify Icon"
              className="h-7 w-7"
            />
          </Avatar>
          {/* Mobile avatar */}
          <Avatar 
            className="ml-2 cursor-pointer md:hidden bg-health-highlight text-health-primary"
            onClick={() => window.location.href = '/doctor/profile'}
          >
            <img
              src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
              alt="Healthify Icon"
              className="h-6 w-6"
            />
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default DoctorHeader;

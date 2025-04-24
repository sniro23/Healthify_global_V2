import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Calendar, Heart, User } from "lucide-react";
import { Button } from "@healthify/ui-kit";

const MobileNav: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around p-2">
      <Link to="/patient">
        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
          <Activity className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Button>
      </Link>
      <Link to="/patient/appointments">
        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
          <Calendar className="h-5 w-5" />
          <span className="text-xs mt-1">Appointments</span>
        </Button>
      </Link>
      <Link to="/patient/records">
        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">Records</span>
        </Button>
      </Link>
      <Link to="/patient/profile">
        <Button variant="ghost" size="sm" className="flex flex-col items-center p-2">
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Button>
      </Link>
    </div>
  );
};

export default MobileNav; 
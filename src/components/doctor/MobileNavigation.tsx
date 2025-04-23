
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, MessageSquare, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Activity, label: "Dashboard", path: "/doctor" },
  { icon: Users, label: "Patients", path: "/doctor/patients" },
  { icon: Calendar, label: "Appointments", path: "/doctor/appointments" },
  { icon: MessageSquare, label: "Messages", path: "/doctor/messages" },
];

const MobileNavigation = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <nav className="flex justify-around">
        {navItems.map((item) => {
          const isActive = 
            (item.path === "/doctor" && location.pathname === "/doctor") ||
            (item.path !== "/doctor" && location.pathname.startsWith(item.path));
            
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-2 px-3",
                isActive 
                  ? "text-health-primary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default MobileNavigation;

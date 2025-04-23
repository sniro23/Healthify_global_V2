
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, Users, MessageCircle, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/contexts/NotificationContext";
import { Badge } from "@/packages/ui-kit";

const navItems = [
  { icon: Activity, label: "Dashboard", path: "/doctor" },
  { icon: Calendar, label: "Appointments", path: "/doctor/appointments" },
  { icon: Users, label: "Patients", path: "/doctor/patients" },
  { icon: MessageCircle, label: "Consults", path: "/doctor/consultations" },
  { icon: Bell, label: "Alerts", path: "/doctor/notifications" },
];

const MobileNavigation = () => {
  const location = useLocation();
  const { unreadCount } = useNotifications();

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
                "flex flex-col items-center py-2 px-3 relative",
                isActive 
                  ? "text-health-primary" 
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
              
              {item.label === "Alerts" && unreadCount > 0 && (
                <Badge 
                  variant="health" 
                  className="absolute -top-1 right-1 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center p-0 text-[0.65rem]"
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default MobileNavigation;

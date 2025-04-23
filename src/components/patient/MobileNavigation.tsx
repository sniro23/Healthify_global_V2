
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Activity, Calendar, Heart, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Activity, label: "Dashboard", path: "/patient" },
  { icon: Calendar, label: "Appointments", path: "/patient/appointments" },
  { icon: Heart, label: "Records", path: "/patient/records" },
  { icon: MessageCircle, label: "Messages", path: "/patient/messages" },
  { icon: User, label: "Profile", path: "/patient/profile" },
];

const MobileNavigation = () => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <nav className="flex justify-around">
        {navItems.map((item) => {
          const isActive = 
            (item.path === "/patient" && router.pathname === "/patient") ||
            (item.path !== "/patient" && router.pathname.startsWith(item.path));
            
          return (
            <Link
              key={item.path}
              href={item.path}
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

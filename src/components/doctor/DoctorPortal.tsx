"use client";

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter } from "@/packages/ui-kit";
import { Activity, Calendar, MessageSquare, User, Settings, LogOut, Bell, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { label: "Dashboard", icon: Activity, route: "" },
  { label: "Appointments", icon: Calendar, route: "appointments" },
  { label: "Patients", icon: Users, route: "patients" },
  { label: "Messages", icon: MessageSquare, route: "messages" },
  { label: "Prescriptions", icon: ClipboardList, route: "prescriptions" },
  { label: "Profile", icon: User, route: "profile" },
  { label: "Settings", icon: Settings, route: "settings" }
];

export function DoctorPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const location = useLocation();
  const isMobile = useIsMobile();

  const pathSegments = location.pathname.split('/');
  const activePath = pathSegments.length > 2 ? pathSegments[2] : "";

  return (
    <div className="flex h-full bg-gray-50 md:bg-white">
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar collapsed={collapsed}>
          <SidebarHeader collapsed={collapsed}>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 !bg-transparent">
                <img
                  src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
                  alt="Healthify Icon"
                  className="h-8 w-8"
                />
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col">
                  <img
                    src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
                    alt="Healthify Logo"
                    className="h-8 w-auto mb-1"
                    style={{ maxWidth: 120 }}
                  />
                  <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-health-highlight text-health-primary border-health-primary">
                    Doctor Portal
                  </Badge>
                </div>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const isActive =
                  (item.route === "" && (activePath === "" || activePath === undefined)) ||
                  (item.route !== "" && (activePath === item.route || location.pathname.includes(`/doctor/${item.route}`)));

                return (
                  <Link
                    key={item.label}
                    to={item.route === "" ? "/doctor" : `/doctor/${item.route}`}
                    style={{ textDecoration: "none" }}
                  >
                    <SidebarItem
                      active={isActive}
                      icon={<item.icon className="h-5 w-5" />}
                      collapsed={collapsed}
                    >
                      {item.label}
                    </SidebarItem>
                  </Link>
                );
              })}
              
              <Link
                to="/doctor/notifications"
                style={{ textDecoration: "none" }}
              >
                <SidebarItem
                  active={activePath === "notifications"}
                  icon={<Bell className="h-5 w-5" />}
                  collapsed={collapsed}
                >
                  Notifications
                </SidebarItem>
              </Link>
            </div>
          </SidebarContent>
          <SidebarFooter>
            <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
              <SidebarItem
                icon={<LogOut className="h-5 w-5" />}
                collapsed={collapsed}
              >
                Logout
              </SidebarItem>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start mt-2"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "→" : "← Collapse"}
            </Button>
          </SidebarFooter>
        </Sidebar>
      </div>

      <div
        className={`flex-1 overflow-auto bg-white flex flex-col
          ${isMobile ? 'pb-20 px-2 pt-2' : 'p-3 md:p-0'}
        `}
      >
        {isMobile && (
          <header className="flex items-center justify-between gap-2 mb-3 p-2 bg-white rounded-md shadow-sm">
            <div className="flex items-center">
              <img
                src="/lovable-uploads/8d5756c5-71ca-468e-9d01-536c025ecfdb.png"
                alt="Healthify Icon"
                className="h-6 w-6 mr-2"
              />
              <img
                src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
                alt="Healthify Logo"
                className="h-5 w-auto"
                style={{ maxWidth: 100 }}
              />
            </div>
            <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-health-highlight text-health-primary border-health-primary">
              Doctor Portal
            </Badge>
          </header>
        )}
        <div className="flex-1 flex flex-col min-h-0 max-w-full">
          <Outlet />
        </div>
      </div>
      
      {isMobile && <MobileNavigation />}
    </div>
  );
}

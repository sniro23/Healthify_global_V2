import React from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { Activity, Calendar, FileText, Heart, MessageCircle, User } from "lucide-react";
import { Link, Outlet, useLocation, Navigate, Routes, Route } from "react-router-dom";
import Dashboard from "./patient/Dashboard";
import Appointments from "./patient/Appointments";
import HealthRecords from "./patient/HealthRecords";
import Messages from "./patient/Messages";
import Prescriptions from "./patient/Prescriptions";
import Profile from "./patient/Profile";

const sidebarItems = [
  { label: "Dashboard", icon: Activity, route: "" },
  { label: "Appointments", icon: Calendar, route: "appointments" },
  { label: "Health Records", icon: Heart, route: "records" },
  { label: "Messages", icon: MessageCircle, route: "messages" },
  { label: "Prescriptions", icon: FileText, route: "prescriptions" },
  { label: "Profile", icon: User, route: "profile" },
];

export function PatientPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();

  // Split current pathname to derive subroute
  const activePath = location.pathname.split("/patient/")[1]?.split("/")[0] || "";

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar collapsed={collapsed}>
        <SidebarHeader collapsed={collapsed}>
          <div className="flex items-center">
            <img
              src="https://via.placeholder.com/40x40"
              alt="Healthify Logo"
              className="h-8 w-8 mr-2"
            />
            {!collapsed && <h1 className="text-xl font-bold text-health-primary">Healthify</h1>}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              // Determine if the sidebar item is active
              const isActive =
                (item.route === "" && (activePath === "" || activePath === undefined)) ||
                (item.route !== "" && activePath === item.route);

              return (
                <Link
                  key={item.label}
                  to={item.route === "" ? "/patient" : `/patient/${item.route}`}
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
          </div>
        </SidebarContent>
        <SidebarFooter>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "→" : "← Collapse"}
          </Button>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 overflow-auto bg-white">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="records" element={<HealthRecords />} />
          <Route path="messages" element={<Messages />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  );
}

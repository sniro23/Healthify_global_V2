
import React from "react";
import { Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter } from "@/packages/ui-kit";
import { Calendar, ClipboardList, MessageCircle, Settings, Users, Activity, Bell, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DoctorSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ collapsed, setCollapsed, isMobile }) => {
  const location = useLocation();

  return (
    <div className={`${isMobile ? 'hidden' : 'block'}`}>
      <Sidebar collapsed={collapsed || isMobile}>
        <SidebarHeader collapsed={collapsed}>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/31616087-bfd6-4911-96a7-6815ec19ce8d.png"
              alt="Healthify Logo"
              className="h-8 w-8 mr-2"
            />
            {!collapsed && <h1 className="text-xl font-bold text-health-primary">Healthify MD</h1>}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2">
            <Link to="/doctor">
              <SidebarItem active={location.pathname === '/doctor'} icon={<Activity className="h-5 w-5" />} collapsed={collapsed}>
                Dashboard
              </SidebarItem>
            </Link>
            <Link to="/doctor/patients">
              <SidebarItem icon={<Users className="h-5 w-5" />} collapsed={collapsed}>
                Patients
              </SidebarItem>
            </Link>
            <Link to="/doctor/appointments">
              <SidebarItem icon={<Calendar className="h-5 w-5" />} collapsed={collapsed}>
                Appointments
              </SidebarItem>
            </Link>
            <Link to="/doctor/consultations">
              <SidebarItem icon={<MessageCircle className="h-5 w-5" />} collapsed={collapsed}>
                Consultations
              </SidebarItem>
            </Link>
            <Link to="/doctor/prescriptions">
              <SidebarItem icon={<ClipboardList className="h-5 w-5" />} collapsed={collapsed}>
                Prescriptions
              </SidebarItem>
            </Link>
            <Link to="/doctor/notifications">
              <SidebarItem 
                icon={<Bell className="h-5 w-5" />} 
                collapsed={collapsed}
                active={location.pathname === '/doctor/notifications'}
              >
                Notifications
              </SidebarItem>
            </Link>
            <Link to="/doctor/settings">
              <SidebarItem icon={<Settings className="h-5 w-5" />} collapsed={collapsed}>
                Settings
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
          <button 
            className="w-full justify-start text-left text-gray-600 p-2 hover:bg-gray-100 rounded"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "→" : "← Collapse"}
          </button>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default DoctorSidebar;

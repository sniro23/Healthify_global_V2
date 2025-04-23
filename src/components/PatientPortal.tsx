
import React from "react";
import { Button, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { 
  Activity, Calendar, FileText, Heart, MessageCircle, User, 
  HelpCircle, Settings, Bell, LogOut, Pill, TestTube 
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import MobileNavigation from "./patient/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";

const sidebarItems = [
  { label: "Dashboard", icon: Activity, route: "" },
  { label: "Appointments", icon: Calendar, route: "appointments" },
  { label: "Health Records", icon: Heart, route: "records" },
  { label: "Lab Reports", icon: TestTube, route: "records/labs" },
  { label: "Messages", icon: MessageCircle, route: "messages" },
  { label: "Prescriptions", icon: Pill, route: "prescriptions" },
  { label: "Profile", icon: User, route: "profile" },
  { label: "Payment Settings", icon: Settings, route: "payment-settings" },
  { label: "Help Center", icon: HelpCircle, route: "help" },
  { label: "Contact Support", icon: Bell, route: "contact" },
];

export function PatientPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  // Get the current path segments
  const pathSegments = location.pathname.split('/');
  const activePath = pathSegments.length > 2 ? pathSegments[2] : "";

  // Get subscription status - would come from API in a real app
  const [subscription, setSubscription] = React.useState({
    tier: "Category B",
    active: true
  });

  return (
    <div className="flex h-full">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar collapsed={collapsed}>
          <SidebarHeader collapsed={collapsed}>
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2 bg-health-highlight text-health-primary">
                <span>JD</span>
              </Avatar>
              {!collapsed && (
                <div className="flex flex-col">
                  <h1 className="text-base font-semibold text-health-primary">John Doe</h1>
                  <div className="flex items-center">
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5 bg-health-highlight text-health-primary border-health-primary">
                      {subscription.tier}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                // Determine if the sidebar item is active
                const isActive =
                  (item.route === "" && (activePath === "" || activePath === undefined)) ||
                  (item.route !== "" && (activePath === item.route || location.pathname.includes(`/patient/${item.route}`)));

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

      <div className={`flex-1 overflow-auto bg-white ${isMobile ? 'pb-20' : 'p-4'}`}>
        <Outlet />
      </div>
      
      {/* Mobile Navigation - Visible only on mobile */}
      {isMobile && <MobileNavigation />}
    </div>
  );
}

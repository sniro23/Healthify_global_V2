
import React from "react";
import { Button, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { 
  Activity, Calendar, FileText, Heart, MessageCircle, User, 
  HelpCircle, Settings, Bell, LogOut, Pill, TestTube 
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import MobileNavigation from "./patient/MobileNavigation";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";

// Dynamically import pages based on the current route
const Dashboard = dynamic(() => import("./patient/Dashboard"));
const Appointments = dynamic(() => import("./patient/Appointments"));
const HealthRecords = dynamic(() => import("./patient/HealthRecords"));
const LabReports = dynamic(() => import("./patient/LabReports"));
const Messages = dynamic(() => import("./patient/Messages"));
const Prescriptions = dynamic(() => import("./patient/Prescriptions"));
const Profile = dynamic(() => import("./patient/Profile"));
const PaymentSettings = dynamic(() => import("./patient/PaymentSettings"));
const HelpCenter = dynamic(() => import("./patient/HelpCenter"));
const ContactSupport = dynamic(() => import("./patient/ContactSupport"));
const AppointmentDetails = dynamic(() => import("./patient/AppointmentDetails"));
const BookAppointment = dynamic(() => import("./patient/BookAppointment"));
const MedicationDetails = dynamic(() => import("./patient/MedicationDetails"));
const VisitSummary = dynamic(() => import("./patient/VisitSummary"));

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
  const router = useRouter();
  const isMobile = useIsMobile();

  // Get the current route from Next.js router
  const currentPath = router.pathname.split("/");
  const activePath = currentPath.length > 2 ? currentPath[2] : "";

  // Get subscription status - would come from API in a real app
  const [subscription, setSubscription] = React.useState({
    tier: "Category B",
    active: true
  });

  // Determine which component to render based on the current route
  const renderContent = () => {
    const path = router.pathname;
    if (path === "/patient") return <Dashboard />;
    if (path === "/patient/appointments") return <Appointments />;
    if (path === "/patient/appointments/book") return <BookAppointment />;
    if (path.startsWith("/patient/appointments/") && path !== "/patient/appointments/book") 
      return <AppointmentDetails />;
    if (path === "/patient/records") return <HealthRecords />;
    if (path === "/patient/records/labs") return <LabReports />;
    if (path === "/patient/messages") return <Messages />;
    if (path === "/patient/prescriptions") return <Prescriptions />;
    if (path.startsWith("/patient/prescriptions/")) return <MedicationDetails />;
    if (path.startsWith("/patient/visit-summary/")) return <VisitSummary />;
    if (path === "/patient/profile") return <Profile />;
    if (path === "/patient/help") return <HelpCenter />;
    if (path === "/patient/contact") return <ContactSupport />;
    if (path === "/patient/payment-settings") return <PaymentSettings />;
    
    // Default case
    return <Dashboard />;
  };

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
                  (item.route !== "" && (activePath === item.route || router.pathname.includes(`/patient/${item.route}`)));

                return (
                  <Link
                    key={item.label}
                    href={item.route === "" ? "/patient" : `/patient/${item.route}`}
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
            <Link href="/" style={{ textDecoration: "none", width: "100%" }}>
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
        {renderContent()}
      </div>
      
      {/* Mobile Navigation - Visible only on mobile */}
      {isMobile && <MobileNavigation />}
    </div>
  );
}

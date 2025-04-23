import React from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { Calendar, ClipboardList, MessageCircle, Settings, Users, Activity, Bell, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import NotificationBell from "./doctor/NotificationBell";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import MobileNavigation from "./doctor/MobileNavigation";

export function DoctorPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  const isMobile = useIsMobile();
  const router = useRouter();
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`${isMobile ? 'hidden' : 'block'}`}>
        <Sidebar collapsed={collapsed || isMobile}>
          <SidebarHeader collapsed={collapsed}>
            <div className="flex items-center">
              <Image 
                src="/lovable-uploads/31616087-bfd6-4911-96a7-6815ec19ce8d.png"
                alt="Healthify Logo"
                className="h-8 w-8 mr-2"
                width={32}
                height={32}
              />
              {!collapsed && <h1 className="text-xl font-bold text-health-primary">Healthify MD</h1>}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <div className="space-y-2">
              <Link href="/doctor">
                <SidebarItem active={router.pathname === '/doctor'} icon={<Activity className="h-5 w-5" />} collapsed={collapsed}>
                  Dashboard
                </SidebarItem>
              </Link>
              <Link href="/doctor/patients">
                <SidebarItem icon={<Users className="h-5 w-5" />} collapsed={collapsed}>
                  Patients
                </SidebarItem>
              </Link>
              <Link href="/doctor/appointments">
                <SidebarItem icon={<Calendar className="h-5 w-5" />} collapsed={collapsed}>
                  Appointments
                </SidebarItem>
              </Link>
              <Link href="/doctor/consultations">
                <SidebarItem icon={<MessageCircle className="h-5 w-5" />} collapsed={collapsed}>
                  Consultations
                </SidebarItem>
              </Link>
              <Link href="/doctor/prescriptions">
                <SidebarItem icon={<ClipboardList className="h-5 w-5" />} collapsed={collapsed}>
                  Prescriptions
                </SidebarItem>
              </Link>
              <Link href="/doctor/notifications">
                <SidebarItem 
                  icon={<Bell className="h-5 w-5" />} 
                  collapsed={collapsed}
                  active={router.pathname === '/doctor/notifications'}
                >
                  Notifications
                </SidebarItem>
              </Link>
              <Link href="/doctor/settings">
                <SidebarItem icon={<Settings className="h-5 w-5" />} collapsed={collapsed}>
                  Settings
                </SidebarItem>
              </Link>
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
              className="w-full justify-start"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "→" : "← Collapse"}
            </Button>
          </SidebarFooter>
        </Sidebar>
      </div>

      <div className="flex-1 overflow-auto p-0">
        <div className="bg-white border-b border-gray-200">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              {isMobile && (
                <Image 
                  src="/lovable-uploads/31616087-bfd6-4911-96a7-6815ec19ce8d.png"
                  alt="Healthify Logo"
                  className="h-8 w-8 mr-2"
                  width={32}
                  height={32}
                />
              )}
              <h2 className="text-xl font-semibold text-gray-900">
                {router.pathname === '/doctor' && 'Dashboard'}
                {router.pathname === '/doctor/patients' && 'Patients'}
                {router.pathname === '/doctor/appointments' && 'Appointments'}
                {router.pathname === '/doctor/consultations' && 'Consultations'}
                {router.pathname === '/doctor/prescriptions' && 'Prescriptions'}
                {router.pathname === '/doctor/notifications' && 'Notifications'}
                {router.pathname === '/doctor/settings' && 'Settings'}
              </h2>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center mr-4">
                <span className={`mr-2 ${isOnline ? 'text-green-600' : 'text-gray-400'}`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
                <button 
                  onClick={() => setIsOnline(!isOnline)}
                  className={`w-12 h-6 rounded-full flex items-center transition-colors duration-300 ease-in-out ${
                    isOnline ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'
                  }`}
                >
                  <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300"></div>
                </button>
              </div>
              
              <NotificationBell />
              
              <Avatar 
                className="ml-2 cursor-pointer"
                onClick={() => router.push('/doctor/profile')}
              >
                <span>DR</span>
              </Avatar>
            </div>
          </div>
        </div>

        {router.pathname === '/doctor' && (
          <div className="p-3 md:p-6">
            <div className="flex flex-wrap justify-between items-center mb-8">
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hello, Dr. Johnson</h1>
                <p className="text-gray-600">Wednesday, April 22, 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-1">Today's Appointments</h3>
                  <p className="text-3xl font-bold text-health-primary">8</p>
                  <p className="text-sm text-gray-600">3 completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-1">Pending Chats</h3>
                  <p className="text-3xl font-bold text-health-primary">5</p>
                  <p className="text-sm text-gray-600">2 urgent</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-1">Total Patients</h3>
                  <p className="text-3xl font-bold text-health-accent">143</p>
                  <p className="text-sm text-gray-600">+12 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-1">Prescriptions</h3>
                  <p className="text-3xl font-bold text-purple-500">26</p>
                  <p className="text-sm text-gray-600">4 require renewal</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mb-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Next 3 scheduled consultations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Avatar src="https://via.placeholder.com/100" alt="Sarah Miller" className="mr-3" />
                          <div>
                            <h3 className="font-medium">Sarah Miller</h3>
                            <p className="text-sm text-gray-600">Follow-up • 10:00 AM</p>
                          </div>
                        </div>
                        <Badge variant="health">Video</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Avatar src="https://via.placeholder.com/100" alt="John Davis" className="mr-3" />
                          <div>
                            <h3 className="font-medium">John Davis</h3>
                            <p className="text-sm text-gray-600">New Patient • 11:30 AM</p>
                          </div>
                        </div>
                        <Badge variant="health">Video</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                        <div className="flex items-center">
                          <Avatar src="https://via.placeholder.com/100" alt="Emma Wilson" className="mr-3" />
                          <div>
                            <h3 className="font-medium">Emma Wilson</h3>
                            <p className="text-sm text-gray-600">Prescription Renewal • 2:00 PM</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Chat</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View All Appointments</Button>
                  </CardFooter>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="health" className="w-full">Start Consultation</Button>
                    <Button variant="secondary" className="w-full">Write Prescription</Button>
                    <Button variant="secondary" className="w-full">View Patient Records</Button>
                    <Button variant="outline" className="w-full">Schedule Appointment</Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest patient communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex">
                      <Avatar src="https://via.placeholder.com/100" alt="Robert Thompson" className="mr-3" />
                      <div>
                        <h3 className="font-medium">Robert Thompson</h3>
                        <p className="text-sm text-gray-600">I've been taking the new medication for three days now and...</p>
                        <p className="text-xs text-gray-500">20 minutes ago</p>
                      </div>
                    </div>
                    <Badge variant="warning">Awaiting Reply</Badge>
                  </div>
                  <div className="flex justify-between items-start p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex">
                      <Avatar src="https://via.placeholder.com/100" alt="Lisa Johnson" className="mr-3" />
                      <div>
                        <h3 className="font-medium">Lisa Johnson</h3>
                        <p className="text-sm text-gray-600">Thank you for the prescription. I wanted to ask about potential side effects...</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <Badge variant="warning">Awaiting Reply</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All Messages</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {router.pathname === '/doctor/notifications' && (
          <NotificationScreen />
        )}
      </div>
      
      {isMobile && <MobileNavigation />}
    </div>
  );
}

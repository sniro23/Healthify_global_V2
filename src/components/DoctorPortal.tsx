
import React from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { Calendar, ClipboardList, MessageCircle, Settings, Users, Activity } from "lucide-react";

export function DoctorPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(true);
  
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
            {!collapsed && <h1 className="text-xl font-bold text-health-primary">Healthify MD</h1>}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2">
            <SidebarItem active icon={<Activity className="h-5 w-5" />} collapsed={collapsed}>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={<Users className="h-5 w-5" />} collapsed={collapsed}>
              Patients
            </SidebarItem>
            <SidebarItem icon={<Calendar className="h-5 w-5" />} collapsed={collapsed}>
              Appointments
            </SidebarItem>
            <SidebarItem icon={<MessageCircle className="h-5 w-5" />} collapsed={collapsed}>
              Consultations
            </SidebarItem>
            <SidebarItem icon={<ClipboardList className="h-5 w-5" />} collapsed={collapsed}>
              Prescriptions
            </SidebarItem>
            <SidebarItem icon={<Settings className="h-5 w-5" />} collapsed={collapsed}>
              Settings
            </SidebarItem>
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

      <div className="flex-1 overflow-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hello, Dr. Johnson</h1>
            <p className="text-gray-600">Wednesday, April 22, 2025</p>
          </div>
          <div className="flex items-center">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className="text-3xl font-bold text-health-secondary">5</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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
                    <Badge variant="healthSecondary">Chat</Badge>
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
                <Button variant="healthSecondary" className="w-full">Write Prescription</Button>
                <Button variant="healthAccent" className="w-full">View Patient Records</Button>
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
    </div>
  );
}

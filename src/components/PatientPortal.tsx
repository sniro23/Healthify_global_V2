
import React from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { Activity, Calendar, FileText, Heart, MessageCircle, User } from "lucide-react";

export function PatientPortal() {
  const [collapsed, setCollapsed] = React.useState(false);
  
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
            <SidebarItem active icon={<Activity className="h-5 w-5" />} collapsed={collapsed}>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={<Calendar className="h-5 w-5" />} collapsed={collapsed}>
              Appointments
            </SidebarItem>
            <SidebarItem icon={<Heart className="h-5 w-5" />} collapsed={collapsed}>
              Health Records
            </SidebarItem>
            <SidebarItem icon={<MessageCircle className="h-5 w-5" />} collapsed={collapsed}>
              Messages
            </SidebarItem>
            <SidebarItem icon={<FileText className="h-5 w-5" />} collapsed={collapsed}>
              Prescriptions
            </SidebarItem>
            <SidebarItem icon={<User className="h-5 w-5" />} collapsed={collapsed}>
              Profile
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Sarah</h1>
          <p className="text-gray-600">Here's an overview of your health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Next Appointment</CardTitle>
              <CardDescription>Upcoming doctor visit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Avatar src="https://via.placeholder.com/100" alt="Dr. Smith" className="mr-4" />
                <div>
                  <h3 className="font-medium">Dr. John Smith</h3>
                  <p className="text-sm text-gray-600">Cardiologist</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">Today at 2:00 PM</p>
                <Badge variant="health" className="mt-2">Video Consultation</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="health" className="w-full">Join Appointment</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
              <CardDescription>Your current prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Atorvastatin</p>
                    <p className="text-sm text-gray-600">10mg, once daily</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Lisinopril</p>
                    <p className="text-sm text-gray-600">5mg, once daily</p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vitals</CardTitle>
              <CardDescription>Recent measurements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="font-medium">120/80 mmHg</p>
                  <p className="text-xs text-gray-500">Measured 2 days ago</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="font-medium">72 bpm</p>
                  <p className="text-xs text-gray-500">Measured 2 days ago</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Add New Measurement</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Health Summary</CardTitle>
                <CardDescription>Your current health status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Allergies</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="warning">Penicillin</Badge>
                      <Badge variant="warning">Peanuts</Badge>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Conditions</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="error">Hypertension</Badge>
                      <Badge variant="error">Type 2 Diabetes</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="healthSecondary" className="w-full">Book Appointment</Button>
                <Button variant="healthAccent" className="w-full">Start Chat</Button>
                <Button variant="outline" className="w-full">Request Prescription</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

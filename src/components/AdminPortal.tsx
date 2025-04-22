
import React from "react";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarFooter, Avatar, Badge } from "@/packages/ui-kit";
import { BarChart, Settings, User, Users, FileText, Activity } from "lucide-react";

export function AdminPortal() {
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
            {!collapsed && <h1 className="text-xl font-bold text-health-primary">Healthify Admin</h1>}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="space-y-2">
            <SidebarItem active icon={<Activity className="h-5 w-5" />} collapsed={collapsed}>
              Dashboard
            </SidebarItem>
            <SidebarItem icon={<Users className="h-5 w-5" />} collapsed={collapsed}>
              User Management
            </SidebarItem>
            <SidebarItem icon={<BarChart className="h-5 w-5" />} collapsed={collapsed}>
              Analytics
            </SidebarItem>
            <SidebarItem icon={<FileText className="h-5 w-5" />} collapsed={collapsed}>
              Content
            </SidebarItem>
            <SidebarItem icon={<Settings className="h-5 w-5" />} collapsed={collapsed}>
              System Settings
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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-health-primary">1,247</p>
              <p className="text-sm text-gray-600">+32 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-1">Total Doctors</h3>
              <p className="text-3xl font-bold text-health-secondary">36</p>
              <p className="text-sm text-gray-600">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-1">Appointments</h3>
              <p className="text-3xl font-bold text-health-accent">428</p>
              <p className="text-sm text-gray-600">+56 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-1">Revenue</h3>
              <p className="text-3xl font-bold text-purple-500">$24,358</p>
              <p className="text-sm text-gray-600">+8% this month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Registration</CardTitle>
                <CardDescription>New user signups over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-100 rounded-md">
                  <p className="text-gray-500">Chart Placeholder</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>User Types</CardTitle>
                <CardDescription>Distribution by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md mb-4">
                  <p className="text-gray-500">Pie Chart Placeholder</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Patients</span>
                    <span className="text-sm">1,211</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Doctors</span>
                    <span className="text-sm">36</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Admins</span>
                    <span className="text-sm">12</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Latest registered users on the platform</CardDescription>
            </div>
            <Button variant="outline">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 md:col-span-3 flex items-center">
                  <Avatar src="https://via.placeholder.com/100" alt="Jane Wilson" className="mr-3" />
                  <div>
                    <h3 className="font-medium">Jane Wilson</h3>
                    <p className="text-sm text-gray-600">jane.wilson@example.com</p>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-3 text-sm">
                  <Badge variant="success">Patient</Badge>
                </div>
                <div className="col-span-4 md:col-span-3 text-sm text-gray-600">
                  April 21, 2025
                </div>
                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 md:col-span-3 flex items-center">
                  <Avatar src="https://via.placeholder.com/100" alt="Dr. Alex Kumar" className="mr-3" />
                  <div>
                    <h3 className="font-medium">Dr. Alex Kumar</h3>
                    <p className="text-sm text-gray-600">alex.kumar@example.com</p>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-3 text-sm">
                  <Badge variant="health">Doctor</Badge>
                </div>
                <div className="col-span-4 md:col-span-3 text-sm text-gray-600">
                  April 20, 2025
                </div>
                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-5 md:col-span-3 flex items-center">
                  <Avatar src="https://via.placeholder.com/100" alt="Sam Johnson" className="mr-3" />
                  <div>
                    <h3 className="font-medium">Sam Johnson</h3>
                    <p className="text-sm text-gray-600">sam.johnson@example.com</p>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-3 text-sm">
                  <Badge variant="success">Patient</Badge>
                </div>
                <div className="col-span-4 md:col-span-3 text-sm text-gray-600">
                  April 19, 2025
                </div>
                <div className="col-span-12 md:col-span-3 flex justify-start md:justify-end space-x-2">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

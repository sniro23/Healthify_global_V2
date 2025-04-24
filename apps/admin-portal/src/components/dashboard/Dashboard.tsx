import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/packages/ui-kit";
import { Users, FileText, Settings, Activity } from "lucide-react";
import Link from "next/link";

const mockStats = [
  {
    title: "Total Users",
    value: "3,624",
    change: "+10.1%",
    icon: Users
  },
  {
    title: "Active Patients",
    value: "1,892",
    change: "+5.4%",
    icon: Activity
  },
  {
    title: "Clinicians",
    value: "48",
    change: "+2.1%",
    icon: Users
  },
  {
    title: "Records",
    value: "14,932",
    change: "+12.2%",
    icon: FileText
  }
];

export function Dashboard() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-health-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-green-500">{stat.change} from last month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center p-3 bg-gray-50 rounded-md">
                  <div className="w-2 h-2 bg-health-primary rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">System Update Completed</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span>API Server</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Storage</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Operational</span>
              </div>
              <div className="flex justify-between items-center">
                <span>FHIR Server</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Maintenance</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <Link href="/admin/settings">
          <Button className="bg-health-primary hover:bg-health-primary/90 inline-flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </Link>
      </div>
    </div>
  );
} 
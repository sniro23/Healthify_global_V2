'use client';

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@healthify/ui-kit";
import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
  const mockMetrics = [
    { title: "Total Users", value: "12,345", change: "+12%", icon: Users },
    { title: "New Registrations", value: "256", change: "+5%", icon: Activity },
    { title: "Active Subscriptions", value: "10,123", change: "+8%", icon: CreditCard },
    { title: "Revenue (MTD)", value: "$152,345", change: "+15%", icon: TrendingUp },
  ];

  const mockRecentActivity = [
    { id: "1", action: "New user registered", user: "John Smith", time: "10 minutes ago" },
    { id: "2", action: "Subscription upgraded", user: "Maria Rodriguez", time: "30 minutes ago" },
    { id: "3", action: "Doctor profile updated", user: "Dr. David Chen", time: "1 hour ago" },
    { id: "4", action: "Appointment cancelled", user: "Patient: Sarah Williams", time: "2 hours ago" },
    { id: "5", action: "New plan created", user: "Admin: Alex Johnson", time: "3 hours ago" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockMetrics.map((metric) => {
          const IconComponent = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
                <IconComponent className="h-4 w-4 text-health-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start border-b pb-4">
                  <div className="h-8 w-8 rounded-full bg-health-primary/20 flex items-center justify-center text-health-primary mr-3">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <p>Chart visualization would be implemented here</p>
              <p className="text-sm">Showing user growth data over time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
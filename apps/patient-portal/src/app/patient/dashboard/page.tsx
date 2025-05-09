'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@healthify/ui-kit';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No upcoming appointments</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No recent records</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Book Appointment</li>
              <li>View Medical History</li>
              <li>Update Profile</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
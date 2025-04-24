'use client';

import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@healthify/ui-kit";
import { Calendar, MessageCircle, User, Activity } from "lucide-react";

const mockAppointments = [
  {
    id: "1",
    patientName: "John Doe",
    time: "10:00 AM",
    type: "Check-up",
    status: "Upcoming"
  },
  {
    id: "2",
    patientName: "Jane Smith",
    time: "2:30 PM",
    type: "Follow-up",
    status: "Upcoming"
  }
];

const DoctorDashboard = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Welcome, Dr. Smith</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <User className="h-4 w-4 text-health-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-gray-500">+4 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-health-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-500">2 remaining</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-health-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">3 urgent</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-health-primary" />
              Upcoming Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <p className="text-sm text-gray-500">
                      {appointment.time} - {appointment.type}
                    </p>
                  </div>
                  <Link href={`/appointments/${appointment.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/appointments">
                <Button className="w-full bg-health-primary hover:bg-health-primary/90">
                  View All Appointments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard; 

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, Badge } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export const DoctorDashboardContent = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hello, Dr. Johnson</h1>
          <p className="text-gray-600">Wednesday, April 23, 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                        {appointment.patientName.charAt(0)}
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{appointment.patientName}</h3>
                      <p className="text-sm text-gray-600">{appointment.type} • {appointment.time}</p>
                    </div>
                  </div>
                  <Badge className="bg-health-primary">{appointment.mode}</Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link to="/doctor/appointments" className="w-full">
                <Button variant="outline" className="w-full">View All Appointments</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="default" className="w-full bg-health-primary hover:bg-health-primary/90">Start Consultation</Button>
              <Button variant="secondary" className="w-full">Write Prescription</Button>
              <Button variant="secondary" className="w-full">View Patient Records</Button>
              <Button variant="outline" className="w-full">Schedule Appointment</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex justify-between items-start p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex">
                  <Avatar className="h-10 w-10 mr-3">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                      {message.patientName.charAt(0)}
                    </div>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{message.patientName}</h3>
                    <p className="text-sm text-gray-600">{message.content}</p>
                    <p className="text-xs text-gray-500">{message.time}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  {message.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Link to="/doctor/messages" className="w-full">
            <Button variant="outline" className="w-full">View All Messages</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

// Mock data for appointments
const upcomingAppointments = [
  {
    id: "1",
    patientName: "Sarah Miller",
    time: "10:00 AM",
    type: "Follow-up",
    mode: "Video"
  },
  {
    id: "2",
    patientName: "John Davis",
    time: "11:30 AM",
    type: "New Patient",
    mode: "Video"
  },
  {
    id: "3",
    patientName: "Emma Wilson",
    time: "2:00 PM",
    type: "Prescription Renewal",
    mode: "Chat"
  }
];

// Mock data for messages
const recentMessages = [
  {
    id: "1",
    patientName: "Robert Thompson",
    content: "I've been taking the new medication for three days now and...",
    time: "20 minutes ago",
    status: "Awaiting Reply"
  },
  {
    id: "2",
    patientName: "Lisa Johnson",
    content: "Thank you for the prescription. I wanted to ask about potential side effects...",
    time: "Yesterday",
    status: "Awaiting Reply"
  }
];

export default DoctorDashboardContent;

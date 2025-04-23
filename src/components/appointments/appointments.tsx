
"use client";

import React from "react";
import { Button, Card, CardHeader, CardContent, CardTitle, Badge } from "@/components/ui";
import { Calendar, MapPin, User, Plus } from "lucide-react";
import Link from "next/link";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  location: string;
  type: string;
  status: string;
}

const statusColors: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-700",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-600",
};

const mockAppointments: Appointment[] = [
  {
    id: "1",
    date: "April 30th, 2025",
    time: "10:00 AM",
    doctor: "Dr. Jane Smith",
    location: "Healthify Clinic, Room 201",
    type: "Consultation",
    status: "Upcoming",
  },
  {
    id: "2",
    date: "March 10th, 2025",
    time: "3:00 PM",
    doctor: "Dr. Amir Patel",
    location: "Online Video Call",
    type: "Follow-up",
    status: "Completed",
  },
];

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
  <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <CardTitle className="text-base">{appointment.type}</CardTitle>
        <div className="flex gap-2 mt-1 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {appointment.date}, {appointment.time}
        </div>
      </div>
      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[appointment.status] || "bg-gray-100 text-gray-500"}`}>
        {appointment.status}
      </span>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4 text-health-primary" />
        <span>{appointment.doctor}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-health-primary" />
        <span>{appointment.location}</span>
      </div>
    </CardContent>
  </Card>
);

export function Appointments() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Calendar className="h-6 w-6 text-health-primary" />
          Appointments
        </h2>
        <Link href="/patient/appointments/book">
          <Button className="bg-health-primary hover:bg-health-primary/90">
            <Plus className="h-4 w-4 mr-2" /> Book Appointment
          </Button>
        </Link>
      </div>
      
      {mockAppointments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {mockAppointments.map((appt) => (
            <Link key={appt.id} href={`/patient/appointments/${appt.id}`}>
              <AppointmentCard appointment={appt} />
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Appointments</h3>
          <p className="text-gray-500 mb-4">You don&apos;t have any scheduled appointments.</p>
          <Link href="/patient/appointments/book">
            <Button>Book Your First Appointment</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

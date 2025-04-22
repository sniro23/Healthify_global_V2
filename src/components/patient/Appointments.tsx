
import React from "react";
import AppointmentCard from "./AppointmentCard";
import { Calendar } from "lucide-react";

const mockAppointments = [
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

const Appointments = () => (
  <div className="p-8">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
      <Calendar className="h-6 w-6 text-health-primary" />
      Appointments
    </h2>
    <div className="flex flex-col gap-4">
      {mockAppointments.map((appt) => (
        <AppointmentCard key={appt.id} appointment={appt} />
      ))}
    </div>
  </div>
);

export default Appointments;

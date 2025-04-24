import React from "react";
import { Link } from "react-router-dom";
import AppointmentCard from "./AppointmentCard";
import { Button } from "@healthify/ui-kit";
import { Calendar, Plus } from "lucide-react";

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
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Calendar className="h-6 w-6 text-health-primary" />
        Appointments
      </h2>
      <Link to="/patient/appointments/book">
        <Button className="bg-health-primary hover:bg-health-primary/90">
          <Plus className="h-4 w-4 mr-2" /> Book Appointment
        </Button>
      </Link>
    </div>
    
    {mockAppointments.length > 0 ? (
      <div className="flex flex-col gap-4">
        {mockAppointments.map((appt) => (
          <Link to={`/patient/appointments/${appt.id}`} key={appt.id} style={{ textDecoration: 'none' }}>
            <AppointmentCard appointment={appt} />
          </Link>
        ))}
      </div>
    ) : (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Appointments</h3>
        <p className="text-gray-500 mb-4">You don't have any scheduled appointments.</p>
        <Link to="/patient/appointments/book">
          <Button>Book Your First Appointment</Button>
        </Link>
      </div>
    )}
  </div>
);

export default Appointments; 
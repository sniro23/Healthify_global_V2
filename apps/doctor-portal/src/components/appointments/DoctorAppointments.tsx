'use client';

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@healthify/ui-kit";
import { Calendar, Clock, Search, Filter } from "lucide-react";
import Link from "next/link";

// Mock appointment data
const mockAppointments = [
  {
    id: "apt1",
    patientName: "John Doe",
    patientId: "pt1",
    start: "2023-12-15T10:00:00Z",
    end: "2023-12-15T10:30:00Z",
    status: "booked",
    description: "Annual check-up"
  },
  {
    id: "apt2",
    patientName: "Jane Smith",
    patientId: "pt2",
    start: "2023-12-15T11:00:00Z",
    end: "2023-12-15T11:30:00Z",
    status: "booked",
    description: "Follow-up appointment"
  },
  {
    id: "apt3",
    patientName: "Robert Johnson",
    patientId: "pt3",
    start: "2023-12-15T14:00:00Z",
    end: "2023-12-15T14:30:00Z",
    status: "pending",
    description: "Blood pressure check"
  },
  {
    id: "apt4",
    patientName: "Sarah Williams",
    patientId: "pt4",
    start: "2023-12-16T09:00:00Z",
    end: "2023-12-16T09:30:00Z",
    status: "booked",
    description: "Diabetes consultation"
  }
];

// Helper functions
const formatAppointmentDateTime = (dateTimeString: string) => {
  const dateTime = new Date(dateTimeString);
  const date = dateTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const time = dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  return { date, time };
};

const getAppointmentStatusDisplay = (status: string) => {
  switch (status) {
    case 'booked':
      return { label: 'Confirmed', color: 'bg-green-100 text-green-800' };
    case 'pending':
      return { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' };
    case 'arrived':
      return { label: 'Arrived', color: 'bg-blue-100 text-blue-800' };
    case 'fulfilled':
      return { label: 'Completed', color: 'bg-gray-100 text-gray-800' };
    case 'cancelled':
      return { label: 'Cancelled', color: 'bg-red-100 text-red-800' };
    default:
      return { label: status, color: 'bg-gray-100 text-gray-800' };
  }
};

export default function DoctorAppointments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  
  // Filter appointments by search and status
  const filteredAppointments = mockAppointments.filter(item => {
    const matchesSearch = 
      item.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    const matchesStatus = 
      filterStatus === "all" || 
      item.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  // Group appointments by date
  const groupAppointmentsByDate = (appointments: typeof mockAppointments) => {
    return appointments.reduce((groups, appointment) => {
      const date = formatAppointmentDateTime(appointment.start).date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {} as Record<string, typeof mockAppointments>);
  };
  
  const appointmentsByDate = groupAppointmentsByDate(filteredAppointments);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <Button className="bg-health-primary hover:bg-health-primary/90 mt-2 sm:mt-0">
          Schedule New Appointment
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-6">
        <div className="w-full md:w-72 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            placeholder="Search appointments..."
            className="w-full pl-10 py-2 pr-3 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select 
            className="px-4 py-2 border rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="booked">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="arrived">Arrived</option>
            <option value="fulfilled">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <Button variant="outline" size="sm" className="w-10 h-10 p-0">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {Object.entries(appointmentsByDate).map(([date, appointments]) => (
          <Card key={date} className="overflow-hidden">
            <CardHeader className="bg-gray-50 py-3">
              <CardTitle className="text-base flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {date}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-gray-100">
              {appointments.map((appointment) => {
                const { time } = formatAppointmentDateTime(appointment.start);
                const endTime = formatAppointmentDateTime(appointment.end).time;
                const statusInfo = getAppointmentStatusDisplay(appointment.status);
                
                return (
                  <div 
                    key={appointment.id} 
                    className="p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="h-10 w-10 mr-3 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium">
                          {appointment.patientName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{appointment.patientName}</h3>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{time} - {endTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                        <Link href={`/appointments/${appointment.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
        
        {Object.keys(appointmentsByDate).length === 0 && (
          <Card>
            <CardContent className="p-6 text-center">
              <p>No appointments found matching your criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 
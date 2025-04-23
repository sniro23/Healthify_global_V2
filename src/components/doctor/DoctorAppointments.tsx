
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Filter, Search, User, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export const DoctorAppointments = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Appointments</h1>
          <p className="text-gray-600">Manage your patient appointments</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link to="/doctor/appointments/schedule">
            <Button className="bg-health-primary hover:bg-health-primary/90">
              <Plus className="mr-1 h-4 w-4" />
              New Appointment
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search appointments..." 
            className="w-full"
            prefix={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="checkup">Check-up</SelectItem>
              <SelectItem value="followup">Follow-up</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="canceled">Canceled</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4 mt-4">
          {upcomingAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>
        <TabsContent value="past" className="space-y-4 mt-4">
          {pastAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>
        <TabsContent value="canceled" className="space-y-4 mt-4">
          {canceledAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "completed" | "canceled";
  mode: string;
}

const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
  const statusColorMap = {
    upcoming: "bg-blue-50 text-blue-700 border-blue-100",
    completed: "bg-green-50 text-green-700 border-green-100", 
    canceled: "bg-red-50 text-red-700 border-red-100"
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex flex-col md:flex-row">
            <div className="bg-gray-50 p-4 md:w-48 flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start">
              <div className="flex items-center mb-0 md:mb-2">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{appointment.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{appointment.time}</span>
              </div>
            </div>
            <div className="p-4 flex-1">
              <div className="flex items-center mb-2">
                <Avatar className="h-10 w-10 mr-3">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                    {appointment.patientName.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <h3 className="font-medium">{appointment.patientName}</h3>
                  <p className="text-sm text-gray-600">Patient ID: {appointment.patientId}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">{appointment.type}</Badge>
                <Badge variant="outline">{appointment.mode}</Badge>
                <Badge variant="outline" className={statusColorMap[appointment.status]}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-gray-100 flex flex-row md:flex-col p-4 gap-2 justify-end">
            <Link to={`/doctor/appointments/${appointment.id}`}>
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
            {appointment.status === "upcoming" && (
              <Button className="w-full bg-health-primary hover:bg-health-primary/90">Start Session</Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const upcomingAppointments: Appointment[] = [
  {
    id: "1",
    patientName: "Sarah Miller",
    patientId: "PT-78542",
    date: "Today",
    time: "10:00 AM",
    type: "Follow-up",
    status: "upcoming",
    mode: "Video Call"
  },
  {
    id: "2",
    patientName: "John Davis",
    patientId: "PT-34567",
    date: "Today",
    time: "11:30 AM",
    type: "New Patient",
    status: "upcoming",
    mode: "In Person"
  },
  {
    id: "3",
    patientName: "Emma Wilson",
    patientId: "PT-56789",
    date: "Tomorrow",
    time: "2:00 PM",
    type: "Prescription Renewal",
    status: "upcoming",
    mode: "Chat"
  }
];

const pastAppointments: Appointment[] = [
  {
    id: "4",
    patientName: "Michael Brown",
    patientId: "PT-12345",
    date: "Apr 20, 2025",
    time: "9:30 AM",
    type: "Check-up",
    status: "completed",
    mode: "In Person"
  },
  {
    id: "5",
    patientName: "Jennifer Smith",
    patientId: "PT-23456",
    date: "Apr 19, 2025",
    time: "3:15 PM",
    type: "Follow-up",
    status: "completed",
    mode: "Video Call"
  }
];

const canceledAppointments: Appointment[] = [
  {
    id: "6",
    patientName: "Robert Wilson",
    patientId: "PT-45678",
    date: "Apr 21, 2025",
    time: "1:00 PM",
    type: "Consultation",
    status: "canceled",
    mode: "Video Call"
  }
];

export default DoctorAppointments;

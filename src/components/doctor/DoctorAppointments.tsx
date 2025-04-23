
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { Calendar, Clock, User, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AppointmentWithParticipants } from "@/models/fhir/appointment";
import { fetchFHIRAppointments, getAppointmentStatusDisplay, formatAppointmentDateTime } from "@/services/fhir/appointmentService";
import AppointmentDetails from "./AppointmentDetails";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState<AppointmentWithParticipants[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithParticipants | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchFHIRAppointments();
        setAppointments(data);
      } catch (error) {
        console.error("Error loading appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadAppointments();
  }, []);
  
  const filteredAppointments = appointments.filter(item => {
    // Filter by search query (patient name or description)
    const matchesSearch = 
      item.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.appointment.description?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    
    // Filter by status
    const matchesStatus = 
      filterStatus === "all" || 
      item.appointment.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });
  
  const groupAppointmentsByDate = (apps: AppointmentWithParticipants[]) => {
    return apps.reduce((groups, appointment) => {
      const date = formatAppointmentDateTime(appointment.appointment.start).date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(appointment);
      return groups;
    }, {} as Record<string, AppointmentWithParticipants[]>);
  };
  
  const appointmentsByDate = groupAppointmentsByDate(filteredAppointments);
  
  const handleAppointmentClick = (appointment: AppointmentWithParticipants) => {
    setSelectedAppointment(appointment);
  };

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
          <Input
            placeholder="Search appointments..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="booked">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="arrived">Arrived</SelectItem>
              <SelectItem value="fulfilled">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full max-w-md mb-4">
          <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          <TabsTrigger value="past" className="flex-1">Past</TabsTrigger>
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {selectedAppointment ? (
            <AppointmentDetails 
              appointmentData={selectedAppointment} 
              onClose={() => setSelectedAppointment(null)}
            />
          ) : loading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>Loading appointments...</p>
              </CardContent>
            </Card>
          ) : filteredAppointments.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p>No appointments found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {Object.entries(appointmentsByDate).map(([date, appts]) => (
                <Card key={date} className="overflow-hidden">
                  <CardHeader className="bg-gray-50 py-3">
                    <CardTitle className="text-base flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 divide-y divide-gray-100">
                    {appts.map((appt) => {
                      const { time } = formatAppointmentDateTime(appt.appointment.start);
                      const endTime = formatAppointmentDateTime(appt.appointment.end).time;
                      const statusInfo = getAppointmentStatusDisplay(appt.appointment.status);
                      
                      return (
                        <div 
                          key={appt.appointment.id} 
                          className="p-4 hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleAppointmentClick(appt)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-10 w-10 mr-3">
                                {appt.patient.imageUrl ? (
                                  <img src={appt.patient.imageUrl} alt={appt.patient.name} className="rounded-full" />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                                    {appt.patient.name.charAt(0)}
                                  </div>
                                )}
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appt.patient.name}</h3>
                                <div className="text-sm text-gray-500 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{time} - {endTime}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
                              <Button variant="outline" size="sm" onClick={(e) => {
                                e.stopPropagation();
                                handleAppointmentClick(appt);
                              }}>
                                Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          <Card>
            <CardContent className="p-6 text-center">
              <p>Past appointments will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardContent className="p-6 text-center">
              <p>All appointments will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

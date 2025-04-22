
import React from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/packages/ui-kit";
import { User, Calendar, MapPin, Clock, Video, MessageCircle, Download } from "lucide-react";

const mockAppointments = {
  "1": {
    id: "1",
    date: "April 30th, 2025",
    time: "10:00 AM",
    doctor: "Dr. Jane Smith",
    specialty: "General Physician",
    location: "Healthify Clinic, Room 201",
    type: "Consultation",
    mode: "Video Call",
    status: "Upcoming",
    notes: "Follow-up on recent lab results. Please bring any medication records.",
    duration: "30 minutes",
  },
  "2": {
    id: "2",
    date: "March 10th, 2025",
    time: "3:00 PM",
    doctor: "Dr. Amir Patel",
    specialty: "Cardiologist",
    location: "Online Video Call",
    type: "Follow-up",
    mode: "Video Call",
    status: "Completed",
    notes: "Review of blood pressure medication effectiveness.",
    duration: "20 minutes",
    visitSummaryId: "vs-001"
  }
};

const AppointmentDetails = () => {
  const { id } = useParams();
  const appointment = id && mockAppointments[id] ? mockAppointments[id] : null;

  if (!appointment) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-3">Appointment Not Found</h2>
        <p className="mb-4">The appointment you're looking for doesn't exist or may have been removed.</p>
        <Link to="/patient/appointments">
          <Button>Return to Appointments</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = appointment.status === "Completed";

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-health-primary" />
        Appointment Details
      </h2>

      <Card className="mb-6">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{appointment.type}</CardTitle>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            appointment.status === "Upcoming" ? "bg-green-100 text-green-700" : 
            appointment.status === "Completed" ? "bg-gray-100 text-gray-700" : 
            "bg-red-100 text-red-600"
          }`}>
            {appointment.status}
          </span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Calendar className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Date & Time</p>
              <p className="text-gray-700">{appointment.date}, {appointment.time}</p>
              <p className="text-sm text-gray-500">Duration: {appointment.duration}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <User className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Doctor</p>
              <p className="text-gray-700">{appointment.doctor}</p>
              <p className="text-sm text-gray-500">{appointment.specialty}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-700">{appointment.location}</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <MessageCircle className="h-5 w-5 text-health-primary mt-0.5" />
            <div>
              <p className="font-medium">Notes</p>
              <p className="text-gray-700">{appointment.notes}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-3">
          {!isCompleted && (
            <>
              <Button className="flex-1">
                <Video className="h-4 w-4 mr-2" /> Join Meeting
              </Button>
              <Button variant="outline" className="flex-1">
                Reschedule
              </Button>
            </>
          )}
          
          {isCompleted && appointment.visitSummaryId && (
            <Link to={`/patient/visit-summary/${appointment.visitSummaryId}`} className="w-full">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" /> View Visit Summary
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Link to="/patient/appointments">
          <Button variant="outline">Back to Appointments</Button>
        </Link>
      </div>
    </div>
  );
};

export default AppointmentDetails;

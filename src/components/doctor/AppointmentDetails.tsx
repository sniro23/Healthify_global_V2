
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  User, 
  FileText,
  MessageSquare
} from "lucide-react";
import { 
  AppointmentWithParticipants, 
  FHIRCodeableConcept
} from "@/models/fhir/appointment";
import { getAppointmentStatusDisplay, formatAppointmentDateTime } from "@/services/fhir/appointmentService";

interface AppointmentDetailsProps {
  appointmentData: AppointmentWithParticipants;
  onClose?: () => void;
}

export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({ 
  appointmentData,
  onClose
}) => {
  const { appointment, patient } = appointmentData;
  const { date, time } = formatAppointmentDateTime(appointment.start);
  const endTime = formatAppointmentDateTime(appointment.end).time;
  const statusInfo = getAppointmentStatusDisplay(appointment.status);
  
  const getCodeableConceptDisplay = (concept: FHIRCodeableConcept | undefined): string => {
    if (!concept || !concept.coding || concept.coding.length === 0) {
      return "Not specified";
    }
    return concept.coding[0].display || concept.coding[0].code;
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Appointment Details</CardTitle>
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4 pb-2 space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            {patient.imageUrl ? (
              <img src={patient.imageUrl} alt={patient.name} className="rounded-full" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-health-primary">
                {patient.name.charAt(0)}
              </div>
            )}
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{patient.name}</h3>
            <p className="text-gray-600">Patient ID: {patient.id}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Date & Time</h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-health-primary" />
                <span>{date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1 text-health-primary" />
                <span>{time} - {endTime}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Appointment Type</h4>
            <div className="flex items-center">
              <FileText className="h-4 w-4 mr-1 text-health-primary" />
              <span>{getCodeableConceptDisplay(appointment.appointmentType)}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
          <p>{appointment.description || "No description provided"}</p>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-md">
          <h4 className="text-sm font-medium text-gray-500 mb-2">FHIR Resource Information</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Resource Type:</span>
              <span className="ml-2 font-medium">{appointment.resourceType}</span>
            </div>
            <div>
              <span className="text-gray-500">Resource ID:</span>
              <span className="ml-2 font-medium">{appointment.id}</span>
            </div>
            <div>
              <span className="text-gray-500">Created:</span>
              <span className="ml-2 font-medium">
                {appointment.created ? new Date(appointment.created).toLocaleString() : "Unknown"}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Participants:</span>
              <span className="ml-2 font-medium">{appointment.participant.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message Patient
          </Button>
          <Button className="bg-health-primary hover:bg-health-primary/90">
            Start Consultation
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AppointmentDetails;

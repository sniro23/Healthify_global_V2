
import { FHIRAppointment, AppointmentWithParticipants } from "../../models/fhir/appointment";

/**
 * Mock FHIR appointment data based on FHIR R4 specification
 */
const mockFHIRAppointments: FHIRAppointment[] = [
  {
    resourceType: "Appointment",
    id: "1",
    status: "booked",
    appointmentType: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/appointment-type",
          code: "FOLLOWUP",
          display: "Follow-up visit"
        }
      ]
    },
    description: "Follow-up appointment for medication review",
    start: "2025-04-24T10:00:00Z",
    end: "2025-04-24T10:30:00Z",
    created: "2025-04-10T14:30:00Z",
    participant: [
      {
        actor: {
          reference: "Patient/p1",
          display: "Sarah Miller"
        },
        status: "accepted"
      },
      {
        actor: {
          reference: "Practitioner/d1",
          display: "Dr. Johnson"
        },
        status: "accepted"
      }
    ]
  },
  {
    resourceType: "Appointment",
    id: "2",
    status: "booked",
    appointmentType: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/appointment-type",
          code: "ROUTINE",
          display: "Routine appointment"
        }
      ]
    },
    description: "Annual physical examination",
    start: "2025-04-24T14:00:00Z",
    end: "2025-04-24T15:00:00Z",
    created: "2025-04-05T09:15:00Z",
    participant: [
      {
        actor: {
          reference: "Patient/p2",
          display: "John Davis"
        },
        status: "accepted"
      },
      {
        actor: {
          reference: "Practitioner/d1",
          display: "Dr. Johnson"
        },
        status: "accepted"
      }
    ]
  },
  {
    resourceType: "Appointment",
    id: "3",
    status: "pending",
    appointmentType: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/appointment-type",
          code: "WALKIN",
          display: "Walk-in appointment"
        }
      ]
    },
    description: "Urgent consultation for persistent cough",
    start: "2025-04-24T16:30:00Z",
    end: "2025-04-24T17:00:00Z",
    created: "2025-04-23T16:00:00Z",
    participant: [
      {
        actor: {
          reference: "Patient/p3",
          display: "Emma Wilson"
        },
        status: "accepted"
      },
      {
        actor: {
          reference: "Practitioner/d1",
          display: "Dr. Johnson"
        },
        status: "needs-action"
      }
    ]
  }
];

// Mock patient images for UI display
const patientImages = {
  "p1": "/lovable-uploads/patient1.png",
  "p2": "/lovable-uploads/patient2.png",
  "p3": "/lovable-uploads/patient3.png"
};

export const fetchFHIRAppointments = async (): Promise<AppointmentWithParticipants[]> => {
  // Simulate API call with a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointmentsWithParticipants = mockFHIRAppointments.map(appointment => {
        // Extract patient information from participants
        const patientParticipant = appointment.participant.find(
          p => p.actor?.reference.startsWith("Patient/")
        );
        
        const doctorParticipant = appointment.participant.find(
          p => p.actor?.reference.startsWith("Practitioner/")
        );
        
        const patientId = patientParticipant?.actor?.reference.split("/")[1] || "";
        const patientName = patientParticipant?.actor?.display || "Unknown Patient";
        
        const doctorId = doctorParticipant?.actor?.reference.split("/")[1] || "";
        const doctorName = doctorParticipant?.actor?.display || "Unknown Doctor";
        
        return {
          appointment,
          patient: {
            id: patientId,
            name: patientName,
            imageUrl: patientImages[patientId as keyof typeof patientImages]
          },
          doctor: {
            id: doctorId,
            name: doctorName
          }
        };
      });
      
      resolve(appointmentsWithParticipants);
    }, 500);
  });
};

export const getAppointmentStatusDisplay = (status: string): { label: string; color: string } => {
  switch (status) {
    case "booked":
      return { label: "Confirmed", color: "bg-green-100 text-green-800" };
    case "pending":
      return { label: "Pending", color: "bg-yellow-100 text-yellow-800" };
    case "arrived":
      return { label: "Arrived", color: "bg-blue-100 text-blue-800" };
    case "fulfilled":
      return { label: "Complete", color: "bg-gray-100 text-gray-800" };
    case "cancelled":
      return { label: "Cancelled", color: "bg-red-100 text-red-800" };
    case "noshow":
      return { label: "No Show", color: "bg-purple-100 text-purple-800" };
    default:
      return { label: status.charAt(0).toUpperCase() + status.slice(1), color: "bg-gray-100 text-gray-800" };
  }
};

export const formatAppointmentDateTime = (dateTimeString: string): { date: string; time: string } => {
  const dateTime = new Date(dateTimeString);
  
  // Format date as "Month Day, Year" (e.g., "April 24, 2025")
  const date = dateTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Format time as "HH:MM AM/PM" (e.g., "10:00 AM")
  const time = dateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  
  return { date, time };
};

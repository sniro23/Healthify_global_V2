
/**
 * FHIR Appointment Resource Model
 * Based on FHIR R4 specification: https://www.hl7.org/fhir/appointment.html
 */

export type AppointmentStatus = 
  | 'proposed' 
  | 'pending' 
  | 'booked' 
  | 'arrived' 
  | 'fulfilled' 
  | 'cancelled' 
  | 'noshow' 
  | 'entered-in-error' 
  | 'checked-in' 
  | 'waitlist';

export type AppointmentParticipantStatus = 
  | 'accepted' 
  | 'declined' 
  | 'tentative' 
  | 'needs-action';

export interface FHIRReference {
  reference: string;
  display?: string;
}

export interface FHIRCodeableConcept {
  coding: {
    system: string;
    code: string;
    display: string;
  }[];
  text?: string;
}

export interface FHIRPeriod {
  start: string;
  end?: string;
}

export interface FHIRParticipant {
  type?: FHIRCodeableConcept[];
  actor?: FHIRReference;
  required?: 'required' | 'optional' | 'information-only';
  status: AppointmentParticipantStatus;
}

export interface FHIRAppointment {
  resourceType: 'Appointment';
  id: string;
  status: AppointmentStatus;
  serviceCategory?: FHIRCodeableConcept[];
  serviceType?: FHIRCodeableConcept[];
  appointmentType?: FHIRCodeableConcept;
  reason?: FHIRCodeableConcept[];
  priority?: number;
  description?: string;
  start: string;
  end: string;
  created?: string;
  comment?: string;
  patientInstruction?: string;
  participant: FHIRParticipant[];
}

export interface AppointmentWithParticipants {
  appointment: FHIRAppointment;
  patient: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  doctor: {
    id: string;
    name: string;
    imageUrl?: string;
  };
}

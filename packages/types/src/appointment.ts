
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'consultation' | 'followup' | 'emergency';
}


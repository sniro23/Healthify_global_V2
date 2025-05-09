export interface User {
  id?: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  created_at?: string;
  updated_at?: string;
}

export type UserRole = User['role'];

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  insuranceProvider?: string;
  insuranceNumber?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  type: string;
  date: string;
  provider: string;
  description: string;
  attachments?: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
} 
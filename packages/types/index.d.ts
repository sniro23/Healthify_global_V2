// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'patient' | 'doctor' | 'admin';
  specialization?: string; // For doctors
  licenseNumber?: string; // For doctors
  phoneNumber?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

// Doctor specific types
export interface Doctor extends User {
  role: 'doctor';
  specialties: string[];
  licenseState: string;
  npiNumber: string;
  boardCertifications?: string[];
  education?: {
    institution: string;
    degree: string;
    year: number;
  }[];
  bio?: string;
  languages?: string[];
  acceptingNewPatients: boolean;
}

// Patient specific types
export interface Patient extends User {
  role: 'patient';
  dateOfBirth: string;
  gender: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Medical Record types
export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription: string;
  notes: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Subscription Plan types
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number | 'Custom';
  billingCycle: 'monthly' | 'annual';
  features: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

export interface Schedule {
  id: string;
  doctorId: string;
  date: string;
  timeSlots: TimeSlot[];
  createdAt: string;
  updatedAt: string;
} 
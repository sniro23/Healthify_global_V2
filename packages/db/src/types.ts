export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface PatientProfile extends UserProfile {
  date_of_birth?: string;
  gender?: string;
  medical_record_number?: string;
  insurance_provider?: string;
  insurance_id?: string;
}

export interface DoctorProfile extends UserProfile {
  specialization?: string;
  license_number?: string;
  is_verified?: boolean;
}

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: 'scheduled' | 'cancelled' | 'completed' | 'no-show';
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'patient' | 'doctor' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      doctor_profiles: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          specialties: string[];
          license_number: string;
          license_state: string;
          npi_number: string;
          board_certifications?: string[];
          education?: Record<string, any>;
          bio: string;
          languages: string[];
          accepting_new_patients: boolean;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['doctor_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['doctor_profiles']['Insert']>;
      };
      patients: {
        Row: {
          id: string;
          user_id: string;
          first_name: string;
          last_name: string;
          date_of_birth: string;
          gender: string;
          email: string;
          phone: string;
          address: string;
          emergency_contact: Record<string, any>;
          medical_history: Record<string, any>;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['patients']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['patients']['Insert']>;
      };
      appointments: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          start_time: string;
          end_time: string;
          status: 'scheduled' | 'cancelled' | 'completed' | 'no-show';
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>;
      };
      health_records: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          visit_date: string;
          diagnosis: string;
          treatment: string;
          prescription?: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['health_records']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['health_records']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          sender_id: string;
          receiver_id: string;
          content: string;
          read: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      audit_logs: {
        Row: {
          id: string;
          user_id: string;
          action: string;
          resource_type: string;
          resource_id: string;
          details: Record<string, any>;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['audit_logs']['Row'], 'id' | 'created_at'>;
        Update: never;
      };
      prescriptions: {
        Row: {
          id: string;
          patient_id: string;
          doctor_id: string;
          medication: string;
          dosage: string;
          frequency: string;
          duration: string;
          notes?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['prescriptions']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['prescriptions']['Insert']>;
      };
    };
    Views: {
      [key: string]: {
        Row: Record<string, unknown>;
        Insert: never;
        Update: never;
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
    Enums: {
      user_role: 'patient' | 'doctor' | 'admin';
    };
  };
} 
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string
          user_id: string | null
          fhir_id: string
          fhir_resource: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          fhir_id: string
          fhir_resource: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          fhir_id?: string
          fhir_resource?: Json
          created_at?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          user_id: string
          specialty: string | null
          bio: string | null
          is_online: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          specialty?: string | null
          bio?: string | null
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          specialty?: string | null
          bio?: string | null
          is_online?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      doctor_patient_relationships: {
        Row: {
          id: string
          doctor_id: string
          patient_id: string
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          patient_id: string
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          patient_id?: string
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          type: string
          delivery_method: string
          status: string
          scheduled_at: string
          completed_at: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          type: string
          delivery_method: string
          status: string
          scheduled_at: string
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          type?: string
          delivery_method?: string
          status?: string
          scheduled_at?: string
          completed_at?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
export type NewRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateRow<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'] 
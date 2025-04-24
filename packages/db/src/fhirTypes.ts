import { Tables } from './types';

/**
 * Extend the Supabase Database type with specific fields needed for FHIR tables
 */
export interface FHIRDatabaseTables {
  patients: {
    Row: {
      id: string;
      fhir_id: string;
      fhir_resource: any;
      user_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      fhir_id: string;
      fhir_resource: any;
      user_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      fhir_id?: string;
      fhir_resource?: any;
      user_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  observations: {
    Row: {
      id: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      category: string[];
      code: string;
      effective_date: string | null;
      status: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      category: string[];
      code: string;
      effective_date?: string | null;
      status: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      fhir_id?: string;
      fhir_resource?: any;
      patient_id?: string;
      category?: string[];
      code?: string;
      effective_date?: string | null;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
  };
  conditions: {
    Row: {
      id: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      code: string;
      clinical_status: string;
      verification_status: string | null;
      category: string[];
      onset_date: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      code: string;
      clinical_status: string;
      verification_status?: string | null;
      category: string[];
      onset_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      fhir_id?: string;
      fhir_resource?: any;
      patient_id?: string;
      code?: string;
      clinical_status?: string;
      verification_status?: string | null;
      category?: string[];
      onset_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  diagnostic_reports: {
    Row: {
      id: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      code: string;
      status: string;
      category: string[];
      issued_date: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      id?: string;
      fhir_id: string;
      fhir_resource: any;
      patient_id: string;
      code: string;
      status: string;
      category: string[];
      issued_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      id?: string;
      fhir_id?: string;
      fhir_resource?: any;
      patient_id?: string;
      code?: string;
      status?: string;
      category?: string[];
      issued_date?: string | null;
      created_at?: string;
      updated_at?: string;
    };
  };
  user_permissions: {
    Row: {
      id: string;
      user_id: string;
      resource_type: string;
      permission: string;
      created_at: string;
    };
    Insert: {
      id?: string;
      user_id: string;
      resource_type: string;
      permission: string;
      created_at?: string;
    };
    Update: {
      id?: string;
      user_id?: string;
      resource_type?: string;
      permission?: string;
      created_at?: string;
    };
  };
}

/**
 * Type utility for accessing FHIR resource types strongly typed
 */
export type FHIRTable<T extends keyof FHIRDatabaseTables> = FHIRDatabaseTables[T]; 
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Patient, Observation, Condition, DiagnosticReport, Appointment } from '@healthify/fhir-types';

export class FHIRClient {
  private supabase;

  constructor() {
    this.supabase = createClientComponentClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
  }

  // Patient methods
  async getPatient(patientId: string): Promise<Patient | null> {
    try {
      const { data, error } = await this.supabase
        .from('patients')
        .select('fhir_resource')
        .eq('id', patientId)
        .single();

      if (error) throw error;
      return data?.fhir_resource as Patient;
    } catch (error) {
      console.error('Error fetching patient:', error);
      throw error;
    }
  }

  async updatePatient(patientId: string, patient: Partial<Patient>): Promise<void> {
    try {
      const { error } = await this.supabase
        .from('patients')
        .update({ fhir_resource: patient })
        .eq('id', patientId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }

  // Observation methods
  async getObservations(patientId: string): Promise<Observation[]> {
    try {
      const { data, error } = await this.supabase
        .from('observations')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('effective_date', { ascending: false });

      if (error) throw error;
      return data?.map(item => item.fhir_resource as Observation) || [];
    } catch (error) {
      console.error('Error fetching observations:', error);
      throw error;
    }
  }

  // Condition methods
  async getConditions(patientId: string): Promise<Condition[]> {
    try {
      const { data, error } = await this.supabase
        .from('conditions')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data?.map(item => item.fhir_resource as Condition) || [];
    } catch (error) {
      console.error('Error fetching conditions:', error);
      throw error;
    }
  }

  // Diagnostic Report methods
  async getDiagnosticReports(patientId: string): Promise<DiagnosticReport[]> {
    try {
      const { data, error } = await this.supabase
        .from('diagnostic_reports')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('effective_date', { ascending: false });

      if (error) throw error;
      return data?.map(item => item.fhir_resource as DiagnosticReport) || [];
    } catch (error) {
      console.error('Error fetching diagnostic reports:', error);
      throw error;
    }
  }

  // Appointment methods
  async searchResources(resourceType: string, queryParams: any): Promise<any[]> {
    try {
      const { data, error } = await this.supabase
        .from(resourceType.toLowerCase())
        .select('fhir_resource')
        .match(queryParams)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data?.map(item => item.fhir_resource) || [];
    } catch (error) {
      console.error(`Error searching ${resourceType}:`, error);
      throw error;
    }
  }

  async createResource(resource: any): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from(resource.resourceType.toLowerCase())
        .insert({ fhir_resource: resource })
        .select('fhir_resource')
        .single();

      if (error) throw error;
      return data.fhir_resource;
    } catch (error) {
      console.error(`Error creating ${resource.resourceType}:`, error);
      throw error;
    }
  }

  async updateResource(resource: any): Promise<any> {
    try {
      const { data, error } = await this.supabase
        .from(resource.resourceType.toLowerCase())
        .update({ fhir_resource: resource })
        .eq('id', resource.id)
        .select('fhir_resource')
        .single();

      if (error) throw error;
      return data.fhir_resource;
    } catch (error) {
      console.error(`Error updating ${resource.resourceType}:`, error);
      throw error;
    }
  }

  async getAppointments(patientId: string): Promise<Appointment[]> {
    try {
      const { data, error } = await this.supabase
        .from('appointments')
        .select('fhir_resource')
        .eq('patient_id', patientId)
        .order('start', { ascending: true });

      if (error) throw error;
      return data?.map(item => item.fhir_resource as Appointment) || [];
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getAvailableSlots(practitionerId: string, date: string): Promise<string[]> {
    try {
      // Get all appointments for the practitioner on the given date
      const { data: appointments, error } = await this.supabase
        .from('appointments')
        .select('fhir_resource')
        .eq('practitioner_id', practitionerId)
        .gte('start', `${date}T00:00:00`)
        .lt('start', `${date}T23:59:59`);

      if (error) throw error;

      // Generate all possible slots for the day (9 AM to 5 PM, 30-minute intervals)
      const allSlots = [];
      for (let hour = 9; hour < 17; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          allSlots.push(`${date}T${time}:00`);
        }
      }

      // Filter out booked slots
      const bookedSlots = appointments?.map(apt => apt.fhir_resource.start) || [];
      return allSlots.filter(slot => !bookedSlots.includes(slot));
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const fhirClient = new FHIRClient(); 
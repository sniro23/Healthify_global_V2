import { fhirClient } from '../client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// Mock the Supabase client
jest.mock('@supabase/auth-helpers-nextjs', () => ({
  createClientComponentClient: jest.fn(),
}));

describe('FHIRClient', () => {
  const mockSupabase = {
    from: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: { fhir_resource: {} }, error: null }),
      then: jest.fn().mockResolvedValue({ data: [{ fhir_resource: {} }], error: null }),
    })),
  };

  beforeEach(() => {
    (createClientComponentClient as jest.Mock).mockReturnValue(mockSupabase);
    jest.clearAllMocks();
  });

  describe('getPatient', () => {
    it('should fetch patient data successfully', async () => {
      const patientId = 'test-patient-id';
      const mockPatient = {
        resourceType: 'Patient',
        id: patientId,
        name: [{ given: ['John'], family: 'Doe' }],
      };

      mockSupabase.from().single.mockResolvedValueOnce({
        data: { fhir_resource: mockPatient },
        error: null,
      });

      const result = await fhirClient.getPatient(patientId);

      expect(mockSupabase.from).toHaveBeenCalledWith('patients');
      expect(mockSupabase.from().select).toHaveBeenCalledWith('fhir_resource');
      expect(mockSupabase.from().eq).toHaveBeenCalledWith('id', patientId);
      expect(result).toEqual(mockPatient);
    });

    it('should handle errors when fetching patient data', async () => {
      const patientId = 'test-patient-id';
      const mockError = new Error('Failed to fetch patient');

      mockSupabase.from().single.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      await expect(fhirClient.getPatient(patientId)).rejects.toThrow('Failed to fetch patient');
    });
  });

  describe('getObservations', () => {
    it('should fetch observations successfully', async () => {
      const patientId = 'test-patient-id';
      const mockObservations = [
        {
          resourceType: 'Observation',
          id: 'obs-1',
          status: 'final',
          code: { text: 'Blood Pressure' },
        },
      ];

      mockSupabase.from().then.mockResolvedValueOnce({
        data: mockObservations.map(obs => ({ fhir_resource: obs })),
        error: null,
      });

      const result = await fhirClient.getObservations(patientId);

      expect(mockSupabase.from).toHaveBeenCalledWith('observations');
      expect(mockSupabase.from().select).toHaveBeenCalledWith('fhir_resource');
      expect(mockSupabase.from().eq).toHaveBeenCalledWith('patient_id', patientId);
      expect(result).toEqual(mockObservations);
    });

    it('should handle errors when fetching observations', async () => {
      const patientId = 'test-patient-id';
      const mockError = new Error('Failed to fetch observations');

      mockSupabase.from().then.mockResolvedValueOnce({
        data: null,
        error: mockError,
      });

      await expect(fhirClient.getObservations(patientId)).rejects.toThrow('Failed to fetch observations');
    });
  });
}); 
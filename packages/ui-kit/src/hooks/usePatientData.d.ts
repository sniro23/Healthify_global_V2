import type { MedicalRecord, Appointment } from '@healthify/types';
interface PatientDataState {
    records: MedicalRecord[];
    appointments: Appointment[];
    isLoading: boolean;
    error: Error | null;
}
interface UsePatientDataReturn extends PatientDataState {
    fetchRecords: () => Promise<void>;
    fetchAppointments: () => Promise<void>;
    addRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateRecord: (id: string, data: Partial<MedicalRecord>) => Promise<void>;
    bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    cancelAppointment: (id: string) => Promise<void>;
}
export declare function usePatientData(patientId: string): UsePatientDataReturn;
export {};
//# sourceMappingURL=usePatientData.d.ts.map
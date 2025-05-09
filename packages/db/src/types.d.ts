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
//# sourceMappingURL=types.d.ts.map
import type { Appointment } from '@healthify/types';
interface TimeSlot {
    start: string;
    end: string;
    isAvailable: boolean;
}
interface Schedule {
    date: string;
    slots: TimeSlot[];
}
interface DoctorScheduleState {
    schedules: Schedule[];
    appointments: Appointment[];
    isLoading: boolean;
    error: Error | null;
}
interface UseDoctorScheduleReturn extends DoctorScheduleState {
    fetchSchedule: (startDate: string, endDate: string) => Promise<void>;
    fetchAppointments: (startDate: string, endDate: string) => Promise<void>;
    addTimeSlot: (date: string, slot: Omit<TimeSlot, 'isAvailable'>) => Promise<void>;
    removeTimeSlot: (date: string, slotStart: string) => Promise<void>;
    updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
}
export declare function useDoctorSchedule(doctorId: string): UseDoctorScheduleReturn;
export {};
//# sourceMappingURL=useDoctorSchedule.d.ts.map
import React from 'react';
export interface AppointmentProps {
    id: string;
    patientName?: string;
    doctorName?: string;
    date: string;
    time: string;
    type: 'Video' | 'Phone' | 'In-Person';
    status: 'booked' | 'pending' | 'arrived' | 'fulfilled' | 'cancelled';
    description?: string;
}
export declare function Appointment({ patientName, doctorName, date, time, type, status, description }: AppointmentProps): React.JSX.Element;
//# sourceMappingURL=Appointment.d.ts.map
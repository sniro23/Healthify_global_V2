import { AppointmentWithParticipants } from "../../types";
export declare const fetchFHIRAppointments: () => Promise<AppointmentWithParticipants[]>;
export declare const getAppointmentStatusDisplay: (status: string) => {
    label: string;
    color: string;
};
export declare const formatAppointmentDateTime: (dateTimeString: string) => {
    date: string;
    time: string;
};
//# sourceMappingURL=index.d.ts.map
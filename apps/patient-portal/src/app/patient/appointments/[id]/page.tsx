import { Metadata } from "next";
import AppointmentDetails from "@/components/appointments/AppointmentDetails";

export const metadata: Metadata = {
  title: "Appointment Details | Healthify",
  description: "View details of your healthcare appointment",
};

export default function AppointmentDetailsPage({ params }: { params: { id: string } }) {
  return <AppointmentDetails id={params.id} />;
} 
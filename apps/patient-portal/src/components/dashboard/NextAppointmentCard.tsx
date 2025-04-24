import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardTitle, CardContent } from "@healthify/ui-kit";

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  type: string;
}

interface NextAppointmentCardProps {
  appointment: Appointment;
}

export const NextAppointmentCard = ({ appointment }: NextAppointmentCardProps) => {
  return (
    <Card className="border-l-4 border-l-health-primary w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Next Appointment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div>
            <div className="flex items-center text-gray-600 mb-1">
              <Calendar className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="text-sm">{appointment.date}, {appointment.time}</span>
            </div>
            <p className="font-medium">{appointment.type} with {appointment.doctor}</p>
          </div>
          <div className="mt-3 sm:mt-0">
            <Link to={`/patient/appointments/${appointment.id}`}>
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 
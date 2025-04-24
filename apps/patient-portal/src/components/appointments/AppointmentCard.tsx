import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@healthify/ui-kit";
import { User, Calendar, MapPin } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: string;
    date: string;
    time: string;
    doctor: string;
    location: string;
    type: string;
    status: string;
  };
}
const statusColors: Record<string, string> = {
  Upcoming: "bg-green-100 text-green-700",
  Completed: "bg-gray-100 text-gray-500",
  Cancelled: "bg-red-100 text-red-600",
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => (
  <Card className="w-full hover:shadow-lg transition-shadow animate-fade-in">
    <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
      <div>
        <CardTitle className="text-base">{appointment.type}</CardTitle>
        <div className="flex gap-2 mt-1 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          {appointment.date}, {appointment.time}
        </div>
      </div>
      <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[appointment.status] || "bg-gray-100 text-gray-500"}`}>
        {appointment.status}
      </span>
    </CardHeader>
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm">
        <User className="h-4 w-4 text-health-primary" />
        <span>{appointment.doctor}</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <MapPin className="h-4 w-4 text-health-primary" />
        <span>{appointment.location}</span>
      </div>
    </CardContent>
  </Card>
);

export default AppointmentCard; 

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { Calendar, Heart, FileText, MessageCircle, User } from "lucide-react";

const dashboardNav = [
  {
    icon: <Calendar className="h-8 w-8 text-health-primary" />,
    title: "Upcoming Appointment",
    description: "Dr. Jane Smith, April 30th, 10:00 AM",
  },
  {
    icon: <Heart className="h-8 w-8 text-health-primary" />,
    title: "Recent Lab Results",
    description: "Blood Test: Normal",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-health-primary" />,
    title: "Unread Messages",
    description: "2 new messages from your care team",
  },
  {
    icon: <FileText className="h-8 w-8 text-health-primary" />,
    title: "Latest Prescription",
    description: "Atorvastatin, refill due in 5 days",
  },
];

const Dashboard = () => (
  <div className="p-8 flex flex-col gap-8">
    <h2 className="text-2xl font-bold mb-4">Welcome, John Doe!</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardNav.map((item) => (
        <Card key={item.title} className="flex flex-col items-center justify-center px-2 py-6 hover:shadow-lg transition-shadow animate-fade-in">
          <CardHeader className="flex flex-col items-center space-y-2 border-none bg-transparent">
            {item.icon}
            <CardTitle className="text-base text-gray-700">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-gray-600">{item.description}</CardContent>
        </Card>
      ))}
    </div>
    <div className="mt-8 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc text-gray-600 space-y-1">
            <li>Remember to take your medication every day.</li>
            <li>Schedule your annual check-up for ongoing wellness.</li>
            <li>View your most recent lab results in the records tab.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Dashboard;

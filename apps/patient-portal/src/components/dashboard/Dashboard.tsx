import React from "react";
import { Calendar, Heart, TestTube, Pill, MessageCircle, Activity as VitalsIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@healthify/ui-kit";
import { Link } from "react-router-dom";
import { SubscriptionCard } from "./SubscriptionCard";
import { NextAppointmentCard } from "./NextAppointmentCard";
import { DashboardNav } from "./DashboardNav";

// Mock data
const subscriptionTier = {
  name: "Category B",
  benefits: [
    "3 free consultations per month",
    "Priority appointment booking",
    "24/7 chat support"
  ],
  nextBilling: "May 15th, 2025",
  price: "$49.99/month"
};

const mockUpcomingAppointment = {
  id: "1",
  date: "April 30th, 2025",
  time: "10:00 AM",
  doctor: "Dr. Jane Smith",
  type: "General Check-up"
};

const dashboardNav = [
  {
    icon: Calendar,
    title: "Appointments",
    description: "Schedule & manage appointments",
    link: "/patient/appointments"
  },
  {
    icon: Heart,
    title: "Health Records",
    description: "View your medical history",
    link: "/patient/records"
  },
  {
    icon: TestTube,
    title: "Lab Reports",
    description: "Access test results",
    link: "/patient/records/labs"
  },
  {
    icon: Pill,
    title: "Prescriptions",
    description: "Manage your medications",
    link: "/patient/prescriptions"
  },
];

const mockMessages = [
  { id: "m1", from: "Dr. Jane Smith", preview: "Your lab results look good!", unread: true },
  { id: "m2", from: "Reception", preview: "Reminder about your appointment", unread: false }
];

const mockVitals = [
  { name: "Blood Pressure", value: "120/80 mmHg", status: "normal" },
  { name: "Heart Rate", value: "72 bpm", status: "normal" },
  { name: "Temperature", value: "98.6 °F", status: "normal" },
  { name: "Blood Glucose", value: "110 mg/dL", status: "elevated" }
];

const Dashboard = () => {
  return (
    <div className="p-4 md:p-8 flex flex-col gap-6 max-w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome, John Doe!</h2>
          <p className="text-gray-600">Let's keep track of your health today</p>
        </div>
        <SubscriptionCard subscription={subscriptionTier} />
      </div>
      
      {mockUpcomingAppointment && (
        <NextAppointmentCard appointment={mockUpcomingAppointment} />
      )}
      
      <DashboardNav items={dashboardNav} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-health-primary" /> Recent Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            {mockMessages.length > 0 ? (
              <div className="space-y-3">
                {mockMessages.map(message => (
                  <div 
                    key={message.id} 
                    className={`p-3 rounded-md ${message.unread ? 'bg-health-highlight border-l-2 border-health-primary' : 'bg-gray-50'}`}
                  >
                    <p className="font-medium">{message.from}</p>
                    <p className="text-sm text-gray-600">{message.preview}</p>
                    {message.unread && (
                      <span className="inline-block px-2 py-0.5 bg-health-primary text-white text-xs rounded-full mt-1">New</span>
                    )}
                  </div>
                ))}
                <Link to="/patient/messages" className="block text-center text-health-primary hover:underline mt-2">
                  View All Messages
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No recent messages</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-lg flex items-center">
              <VitalsIcon className="h-5 w-5 mr-2 text-health-primary" /> Recent Vitals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-2">
              {mockVitals.map((vital, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <span>{vital.name}</span>
                  <div className="flex items-center">
                    <span className={`font-medium ${
                      vital.status === 'normal' ? 'text-green-600' : 
                      vital.status === 'elevated' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {vital.value}
                    </span>
                    <span className={`ml-2 w-2 h-2 rounded-full ${
                      vital.status === 'normal' ? 'bg-green-500' : 
                      vital.status === 'elevated' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/patient/records" className="block text-center text-health-primary hover:underline mt-4">
              View Health Records
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-2 max-w-xl">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-lg">Health Tips</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <ul className="list-inside list-disc text-gray-600 space-y-1 text-sm">
              <li>Remember to take your medication every day.</li>
              <li>Schedule your annual check-up for ongoing wellness.</li>
              <li>View your most recent lab results in the records tab.</li>
              <li>Stay hydrated and aim for 8 hours of sleep daily.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 
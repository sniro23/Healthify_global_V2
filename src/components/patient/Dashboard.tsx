
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/packages/ui-kit";
import { Calendar, Heart, FileText, MessageCircle, Activity, Pill, TestTube, Activity as VitalsIcon } from "lucide-react";
import { Button } from "@/packages/ui-kit";

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

const dashboardNav = [
  {
    icon: <Calendar className="h-8 w-8 text-health-primary" />,
    title: "Appointments",
    description: "Schedule & manage appointments",
    link: "/patient/appointments"
  },
  {
    icon: <Heart className="h-8 w-8 text-health-primary" />,
    title: "Health Records",
    description: "View your medical history",
    link: "/patient/records"
  },
  {
    icon: <TestTube className="h-8 w-8 text-health-primary" />,
    title: "Lab Reports",
    description: "Access test results",
    link: "/patient/records/labs"
  },
  {
    icon: <Pill className="h-8 w-8 text-health-primary" />,
    title: "Prescriptions",
    description: "Manage your medications",
    link: "/patient/prescriptions"
  },
];

const Dashboard = () => (
  <div className="p-8 flex flex-col gap-8">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-2xl font-bold mb-2">Welcome, John Doe!</h2>
        <p className="text-gray-600">Let's keep track of your health today</p>
      </div>
      <div>
        <div className="bg-health-highlight p-3 rounded-md border border-health-primary/20">
          <div className="flex items-center">
            <div className="bg-health-primary text-white p-1 rounded-md">
              <Activity className="h-5 w-5" />
            </div>
            <div className="ml-2">
              <p className="font-medium text-health-primary">Your Plan: {subscriptionTier.name}</p>
              <p className="text-xs text-gray-600">{subscriptionTier.price}</p>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-700">
            <ul className="pl-5 list-disc space-y-1">
              {subscriptionTier.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    {mockUpcomingAppointment && (
      <Card className="border-l-4 border-l-health-primary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Next Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{mockUpcomingAppointment.date}, {mockUpcomingAppointment.time}</span>
              </div>
              <p className="font-medium">{mockUpcomingAppointment.type} with {mockUpcomingAppointment.doctor}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <Link to={`/patient/appointments/${mockUpcomingAppointment.id}`}>
                <Button variant="outline" size="sm">View Details</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    )}
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardNav.map((item) => (
        <Link key={item.title} to={item.link} style={{ textDecoration: 'none' }}>
          <Card className="flex flex-col items-center justify-center px-2 py-6 hover:shadow-lg transition-shadow animate-fade-in h-full">
            <CardHeader className="flex flex-col items-center space-y-2 border-none bg-transparent">
              {item.icon}
              <CardTitle className="text-base text-gray-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600">{item.description}</CardContent>
          </Card>
        </Link>
      ))}
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-health-primary" /> Recent Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
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
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <VitalsIcon className="h-5 w-5 mr-2 text-health-primary" /> Recent Vitals
          </CardTitle>
        </CardHeader>
        <CardContent>
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
    
    <div className="mt-4 max-w-xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Health Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-inside list-disc text-gray-600 space-y-1">
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

export default Dashboard;

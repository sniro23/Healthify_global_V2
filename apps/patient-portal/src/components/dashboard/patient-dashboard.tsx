
'use client';

import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Badge,
  Avatar
} from '@healthify/ui';
import { Activity, Calendar, Heart, MessageCircle, User, HelpCircle, Settings, Bell, Pill, TestTube } from 'lucide-react';
import Link from 'next/link';

const DashboardNav = () => {
  const dashboardNav = [
    {
      icon: <Calendar className="h-8 w-8 text-health-primary" />,
      title: "Appointments",
      description: "Schedule & manage appointments",
      link: "/appointments"
    },
    {
      icon: <Heart className="h-8 w-8 text-health-primary" />,
      title: "Health Records",
      description: "View your medical history",
      link: "/records"
    },
    {
      icon: <TestTube className="h-8 w-8 text-health-primary" />,
      title: "Lab Reports",
      description: "Access test results",
      link: "/records/labs"
    },
    {
      icon: <Pill className="h-8 w-8 text-health-primary" />,
      title: "Prescriptions",
      description: "Manage your medications",
      link: "/prescriptions"
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {dashboardNav.map((item) => (
        <Link key={item.title} href={item.link}>
          <Card className="flex flex-col items-center justify-center px-2 py-4 hover:shadow-lg transition-shadow animate-fade-in h-full">
            <CardHeader className="flex flex-col items-center space-y-2 border-none bg-transparent p-2">
              {item.icon}
              <CardTitle className="text-base text-gray-700">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-gray-600 text-sm p-2">
              {item.description}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export function PatientDashboard() {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const subscription = {
    tier: "Category B",
    benefits: [
      "3 free consultations per month",
      "Priority appointment booking",
      "24/7 chat support"
    ],
    price: "$49.99/month"
  };

  return (
    <div className={`${isMobile ? 'p-2' : 'p-8'} flex flex-col gap-6 max-w-full`}>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-2">Welcome, John Doe!</h2>
          <p className="text-gray-600">Let&apos;s keep track of your health today</p>
        </div>
        <div className="w-full lg:w-auto">
          <div className="bg-health-highlight p-3 rounded-md border border-health-primary/20">
            <div className="flex items-center">
              <div className="bg-health-primary text-white p-1 rounded-md">
                <Activity className="h-5 w-5" />
              </div>
              <div className="ml-2">
                <p className="font-medium text-health-primary">Your Plan: {subscription.tier}</p>
                <p className="text-xs text-gray-600">{subscription.price}</p>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-700">
              <ul className="pl-5 list-disc space-y-1">
                {subscription.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <DashboardNav />
      
      {/* We'll move these components to separate files in the next refactoring */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MessagesCard />
        <VitalsCard />
      </div>
    </div>
  );
}

// Helper components that will be moved to separate files in the next iteration
const MessagesCard = () => (
  <Card>
    <CardHeader className="p-3">
      <CardTitle className="text-lg flex items-center">
        <MessageCircle className="h-5 w-5 mr-2 text-health-primary" /> Recent Messages
      </CardTitle>
    </CardHeader>
    <CardContent className="p-3">
      <div className="space-y-3">
        <div className="p-3 rounded-md bg-health-highlight border-l-2 border-health-primary">
          <p className="font-medium">Dr. Jane Smith</p>
          <p className="text-sm text-gray-600">Your lab results look good!</p>
          <span className="inline-block px-2 py-0.5 bg-health-primary text-white text-xs rounded-full mt-1">New</span>
        </div>
        <div className="p-3 rounded-md bg-gray-50">
          <p className="font-medium">Reception</p>
          <p className="text-sm text-gray-600">Reminder about your appointment</p>
        </div>
        <Link href="/messages" className="block text-center text-health-primary hover:underline mt-2">
          View All Messages
        </Link>
      </div>
    </CardContent>
  </Card>
);

const VitalsCard = () => {
  const mockVitals = [
    { name: "Blood Pressure", value: "120/80 mmHg", status: "normal" },
    { name: "Heart Rate", value: "72 bpm", status: "normal" },
    { name: "Temperature", value: "98.6 °F", status: "normal" },
    { name: "Blood Glucose", value: "110 mg/dL", status: "elevated" }
  ];

  return (
    <Card>
      <CardHeader className="p-3">
        <CardTitle className="text-lg flex items-center">
          <Activity className="h-5 w-5 mr-2 text-health-primary" /> Recent Vitals
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
        <Link href="/records" className="block text-center text-health-primary hover:underline mt-4">
          View Health Records
        </Link>
      </CardContent>
    </Card>
  );
};

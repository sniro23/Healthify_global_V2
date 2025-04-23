
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, Button, Avatar, Badge } from "@/packages/ui-kit";

export const DoctorDashboardContent: React.FC = () => {
  return (
    <div className="p-3 md:p-6">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Hello, Dr. Johnson</h1>
          <p className="text-gray-600">Wednesday, April 22, 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-1">Today's Appointments</h3>
            <p className="text-3xl font-bold text-health-primary">8</p>
            <p className="text-sm text-gray-600">3 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-1">Pending Chats</h3>
            <p className="text-3xl font-bold text-health-primary">5</p>
            <p className="text-sm text-gray-600">2 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-1">Total Patients</h3>
            <p className="text-3xl font-bold text-health-accent">143</p>
            <p className="text-sm text-gray-600">+12 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold mb-1">Prescriptions</h3>
            <p className="text-3xl font-bold text-purple-500">26</p>
            <p className="text-sm text-gray-600">4 require renewal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <span className="text-sm text-gray-500">Next 3 scheduled consultations</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Avatar src="https://via.placeholder.com/100" alt="Sarah Miller" className="mr-3" />
                    <div>
                      <h3 className="font-medium">Sarah Miller</h3>
                      <p className="text-sm text-gray-600">Follow-up • 10:00 AM</p>
                    </div>
                  </div>
                  <Badge variant="health">Video</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Avatar src="https://via.placeholder.com/100" alt="John Davis" className="mr-3" />
                    <div>
                      <h3 className="font-medium">John Davis</h3>
                      <p className="text-sm text-gray-600">New Patient • 11:30 AM</p>
                    </div>
                  </div>
                  <Badge variant="health">Video</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-200">
                  <div className="flex items-center">
                    <Avatar src="https://via.placeholder.com/100" alt="Emma Wilson" className="mr-3" />
                    <div>
                      <h3 className="font-medium">Emma Wilson</h3>
                      <p className="text-sm text-gray-600">Prescription Renewal • 2:00 PM</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Chat</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Appointments</Button>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="health" className="w-full">Start Consultation</Button>
              <Button variant="secondary" className="w-full">Write Prescription</Button>
              <Button variant="secondary" className="w-full">View Patient Records</Button>
              <Button variant="outline" className="w-full">Schedule Appointment</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
          <span className="text-sm text-gray-500">Latest patient communications</span>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-start p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex">
                <Avatar src="https://via.placeholder.com/100" alt="Robert Thompson" className="mr-3" />
                <div>
                  <h3 className="font-medium">Robert Thompson</h3>
                  <p className="text-sm text-gray-600">I've been taking the new medication for three days now and...</p>
                  <p className="text-xs text-gray-500">20 minutes ago</p>
                </div>
              </div>
              <Badge variant="warning">Awaiting Reply</Badge>
            </div>
            <div className="flex justify-between items-start p-3 bg-white rounded-lg border border-gray-200">
              <div className="flex">
                <Avatar src="https://via.placeholder.com/100" alt="Lisa Johnson" className="mr-3" />
                <div>
                  <h3 className="font-medium">Lisa Johnson</h3>
                  <p className="text-sm text-gray-600">Thank you for the prescription. I wanted to ask about potential side effects...</p>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <Badge variant="warning">Awaiting Reply</Badge>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Messages</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DoctorDashboardContent;


import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/packages/ui-kit";
import { Activity, Users, User } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <header className="w-full max-w-4xl text-center mb-12">
        <h1 className="text-3xl font-bold text-health-primary mb-2">Healthify Digital Hub</h1>
        <p className="text-gray-600">Your comprehensive healthcare management solution</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="bg-health-highlight">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-health-primary" />
              Patient Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <p className="text-gray-600">
              Access your health records, appointments and communicate with your doctors.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4">
            <Link to="/patient" className="w-full">
              <Button variant="health" className="w-full">
                Enter Patient Portal
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="bg-health-highlight">
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-health-primary" />
              Doctor Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <p className="text-gray-600">
              Manage patient appointments, review medical records and provide consultations.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4">
            <Link to="/doctor" className="w-full">
              <Button variant="health" className="w-full">
                Enter Doctor Portal
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="bg-health-highlight">
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5 text-health-primary" />
              Admin Portal
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-6">
            <p className="text-gray-600">
              Oversee system operations, manage users and analyze healthcare data.
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 p-4">
            <Link to="/admin" className="w-full">
              <Button variant="health" className="w-full">
                Enter Admin Portal
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>© 2025 Healthify. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;

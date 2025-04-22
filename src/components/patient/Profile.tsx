
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/packages/ui-kit";
import { User, Mail, Phone, MapPin, Calendar, Edit, FileText, Settings, Shield } from "lucide-react";
import ProfileInfo from "./ProfileInfo";

const user = {
  name: "John Doe",
  dob: "January 15th, 1980",
  gender: "Male",
  phone: "+1 555-010-2025",
  email: "john.doe@email.com",
  address: "100 Main St, Cityville, 12345",
  insurance: "Health Plus Coverage",
  subscription: "Category B",
  registrationDate: "March 10th, 2023",
  lastCheckup: "November 5th, 2024",
};

const Profile = () => {
  const [activeTab, setActiveTab] = React.useState("profile");
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <User className="h-6 w-6 text-health-primary" />
        Profile & Settings
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === "profile" ? "default" : "outline"}
          className={activeTab === "profile" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("profile")}
        >
          <User className="h-4 w-4 mr-2" /> Personal Info
        </Button>
        <Link to="/patient/payment-settings">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" /> Payment Settings
          </Button>
        </Link>
        <Button
          variant={activeTab === "documents" ? "default" : "outline"}
          className={activeTab === "documents" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("documents")}
        >
          <FileText className="h-4 w-4 mr-2" /> Documents
        </Button>
        <Button
          variant={activeTab === "privacy" ? "default" : "outline"}
          className={activeTab === "privacy" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("privacy")}
        >
          <Shield className="h-4 w-4 mr-2" /> Privacy
        </Button>
      </div>
      
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <div className="col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-14 w-14 rounded-full bg-health-highlight flex items-center justify-center text-health-primary text-xl font-bold">
                        {user.name.split(' ').map(name => name[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl">{user.name}</h3>
                        <p className="text-sm text-gray-500">Patient since {user.registrationDate}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Calendar className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">{user.dob}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <User className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">{user.gender}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Subscription</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-health-highlight p-3 rounded-md">
                    <h4 className="text-health-primary font-medium">{user.subscription}</h4>
                    <p className="text-sm text-gray-600 mt-1">3 free consultations/month</p>
                    <p className="text-sm text-gray-600">Priority booking</p>
                    <div className="mt-3">
                      <Link to="/patient/payment-settings">
                        <Button size="sm" className="w-full">
                          Manage Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Shield className="h-5 w-5 text-health-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{user.insurance}</p>
                      <p className="text-sm text-gray-500 mt-1">Last verified: 3 months ago</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Update Insurance
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === "documents" && (
        <Card>
          <CardHeader>
            <CardTitle>Medical Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Upload and manage your medical documents</p>
            <div className="space-y-3">
              <div className="border rounded p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-health-primary" />
                  <span>Insurance Card.pdf</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <div className="border rounded p-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-health-primary" />
                  <span>Medical History.pdf</span>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
              <Button className="w-full">
                Upload New Document
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "privacy" && (
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Manage your account security and privacy settings</p>
            
            <div className="space-y-4">
              <div className="border-b pb-3">
                <h3 className="font-medium mb-2">Password</h3>
                <Button variant="outline">Change Password</Button>
              </div>
              
              <div className="border-b pb-3">
                <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                <div className="flex items-center">
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Not Enabled</span>
                  <Button size="sm" variant="ghost" className="ml-3">Enable</Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Data & Privacy</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">Privacy Policy</Button>
                  <Button variant="ghost" className="w-full justify-start">Download My Data</Button>
                  <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-800 hover:bg-red-50">Delete Account</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Profile;

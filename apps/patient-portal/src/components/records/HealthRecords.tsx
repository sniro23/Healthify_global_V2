import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@healthify/ui-kit";
import { Heart, TestTube, Activity, User, FileText, Edit, Pill } from "lucide-react";
import RecordCard from "./RecordCard";

const mockRecords = [
  {
    id: "r1",
    title: "Blood Test",
    date: "March 15th, 2025",
    description: "Routine blood panel. All values within normal range.",
  },
  {
    id: "r2",
    title: "X-Ray - Chest",
    date: "February 2nd, 2025",
    description: "No signs of pneumonia or abnormality.",
  },
];

const mockVitals = {
  height: "170 cm",
  weight: "68 kg",
  bmi: "23.5 (Normal)",
  bloodGroup: "A+",
  bloodPressure: "120/80 mmHg",
  heartRate: "72 bpm",
  glucose: "95 mg/dL",
};

const mockMedicalHistory = {
  conditions: ["Hypertension", "Asthma"],
  surgeries: ["Appendectomy (2015)"],
  allergies: ["Penicillin (rash)"],
};

const mockLifestyle = {
  activity: "Moderate",
  smoking: "Non-smoker",
  alcohol: "Occasionally",
};

const HealthRecords = () => {
  const [activeTab, setActiveTab] = React.useState("overview");
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Heart className="h-6 w-6 text-health-primary" />
          Health Records
        </h2>
        <div className="flex gap-2">
          <Button className="bg-health-primary hover:bg-health-primary/90">
            <Edit className="h-4 w-4 mr-2" /> Edit Health Info
          </Button>
          <Link to="/patient/records/labs">
            <Button variant="outline">
              <TestTube className="h-4 w-4 mr-2" /> Lab Reports
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          className={activeTab === "overview" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "vitals" ? "default" : "outline"}
          className={activeTab === "vitals" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("vitals")}
        >
          Vitals & Biometrics
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "outline"}
          className={activeTab === "history" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("history")}
        >
          Medical History
        </Button>
        <Button
          variant={activeTab === "lifestyle" ? "default" : "outline"}
          className={activeTab === "lifestyle" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("lifestyle")}
        >
          Lifestyle
        </Button>
      </div>
      
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2 text-health-primary" /> Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">John Doe</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">January 15th, 1980</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">Male</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-medium">{mockVitals.bloodGroup}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-health-primary" /> Current Vitals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-medium">{mockVitals.height}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{mockVitals.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">BMI</p>
                  <p className="font-medium">{mockVitals.bmi}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="font-medium">{mockVitals.bloodPressure}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-health-primary" /> Recent Health Records
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecords.map((rec) => (
                  <div key={rec.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{rec.title}</h3>
                      <span className="text-sm text-gray-500">{rec.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-health-primary" /> Medical History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Known Conditions</p>
                  <p className="font-medium">
                    {mockMedicalHistory.conditions.join(', ') || 'None reported'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Allergies</p>
                  <p className="font-medium">
                    {mockMedicalHistory.allergies.join(', ') || 'None reported'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2 text-health-primary" /> Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Link to="/patient/prescriptions" className="text-sm text-health-primary hover:underline">
                View active prescriptions
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "vitals" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vitals & Biometrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Anthropometric</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Height</span>
                        <span className="font-medium">{mockVitals.height}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weight</span>
                        <span className="font-medium">{mockVitals.weight}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">BMI</span>
                        <span className="font-medium">{mockVitals.bmi}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Cardiovascular</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blood Pressure</span>
                        <span className="font-medium">{mockVitals.bloodPressure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Heart Rate</span>
                        <span className="font-medium">{mockVitals.heartRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Metabolic</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blood Glucose</span>
                        <span className="font-medium">{mockVitals.glucose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Blood Group</span>
                        <span className="font-medium">{mockVitals.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "history" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Medical Conditions</h3>
                  {mockMedicalHistory.conditions.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {mockMedicalHistory.conditions.map((condition, i) => (
                        <li key={i} className="text-gray-700">{condition}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No known medical conditions.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Allergies</h3>
                  {mockMedicalHistory.allergies.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {mockMedicalHistory.allergies.map((allergy, i) => (
                        <li key={i} className="text-gray-700">{allergy}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No known allergies.</p>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Surgical History</h3>
                  {mockMedicalHistory.surgeries.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                      {mockMedicalHistory.surgeries.map((surgery, i) => (
                        <li key={i} className="text-gray-700">{surgery}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No surgical history.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Records</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockRecords.map((record) => (
                  <RecordCard key={record.id} record={record} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "lifestyle" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Physical Activity</h3>
                  <p className="text-gray-700">{mockLifestyle.activity}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Smoking Status</h3>
                  <p className="text-gray-700">{mockLifestyle.smoking}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Alcohol Consumption</h3>
                  <p className="text-gray-700">{mockLifestyle.alcohol}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default HealthRecords; 
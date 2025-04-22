
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/packages/ui-kit";
import { Heart, TestTube, Activity, User, FileText, Edit, Pill } from "lucide-react";

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
                <Pill className="h-5 w-5 mr-2 text-health-primary" /> Current Medications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Atorvastatin</p>
                    <p className="text-sm text-gray-500">20mg, once daily</p>
                  </div>
                  <Link to="/patient/prescriptions/p1">
                    <Button variant="ghost" size="sm">Details</Button>
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Vitamin D3</p>
                    <p className="text-sm text-gray-500">1000 IU, once daily</p>
                  </div>
                  <Button variant="ghost" size="sm">Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "vitals" && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Biometric Measurements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="text-lg font-semibold">{mockVitals.height}</p>
                  <p className="text-xs text-gray-500">Last updated: 3 months ago</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="text-lg font-semibold">{mockVitals.weight}</p>
                  <p className="text-xs text-gray-500">Last updated: 3 months ago</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">BMI</p>
                  <p className="text-lg font-semibold">{mockVitals.bmi}</p>
                  <p className="text-xs text-gray-500">Last updated: 3 months ago</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="text-lg font-semibold">{mockVitals.bloodGroup}</p>
                  <p className="text-xs text-gray-500">Last updated: 1 year ago</p>
                </div>
              </div>
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Update Measurements
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Vital Signs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Pressure</p>
                  <p className="text-lg font-semibold">{mockVitals.bloodPressure}</p>
                  <p className="text-xs text-gray-400 mb-2">Last updated: 1 week ago</p>
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-400">Chart Placeholder</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Heart Rate</p>
                  <p className="text-lg font-semibold">{mockVitals.heartRate}</p>
                  <p className="text-xs text-gray-400 mb-2">Last updated: 1 week ago</p>
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-400">Chart Placeholder</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Blood Glucose</p>
                  <p className="text-lg font-semibold">{mockVitals.glucose}</p>
                  <p className="text-xs text-gray-400 mb-2">Last updated: 2 weeks ago</p>
                  <div className="h-20 bg-gray-200 rounded flex items-center justify-center">
                    <p className="text-xs text-gray-400">Chart Placeholder</p>
                  </div>
                </div>
              </div>
              <Button>
                <Activity className="h-4 w-4 mr-2" /> Record New Vitals
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Known Conditions</h3>
                {mockMedicalHistory.conditions.length > 0 ? (
                  <div className="space-y-2">
                    {mockMedicalHistory.conditions.map((condition, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">{condition}</p>
                        <p className="text-sm text-gray-500">Diagnosed: 2020</p>
                        <p className="text-sm text-gray-500">Status: Managed with medication</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No conditions reported</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Allergies</h3>
                {mockMedicalHistory.allergies.length > 0 ? (
                  <div className="space-y-2">
                    {mockMedicalHistory.allergies.map((allergy, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">{allergy}</p>
                        <p className="text-sm text-gray-500">Severity: Moderate</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No allergies reported</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Past Surgeries</h3>
                {mockMedicalHistory.surgeries.length > 0 ? (
                  <div className="space-y-2">
                    {mockMedicalHistory.surgeries.map((surgery, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md">
                        <p className="font-medium">{surgery}</p>
                        <p className="text-sm text-gray-500">Hospital: City General Hospital</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No surgeries reported</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Family Medical History</h3>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium">Hypertension</p>
                  <p className="text-sm text-gray-500">Relation: Father</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md mt-2">
                  <p className="font-medium">Diabetes Type 2</p>
                  <p className="text-sm text-gray-500">Relation: Mother</p>
                </div>
              </div>
              
              <Button>
                <Edit className="h-4 w-4 mr-2" /> Update Medical History
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === "lifestyle" && (
        <Card>
          <CardHeader>
            <CardTitle>Lifestyle Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Physical Activity</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium text-lg">{mockLifestyle.activity}</p>
                  <p className="text-sm text-gray-500 mt-1">30-60 minutes of moderate activity, 3-5 days per week</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Weekly Activity</h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Walking</p>
                        <div className="h-2 w-24 bg-gray-200 rounded-full">
                          <div className="h-2 bg-health-primary rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Cardio</p>
                        <div className="h-2 w-24 bg-gray-200 rounded-full">
                          <div className="h-2 bg-health-primary rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">Strength</p>
                        <div className="h-2 w-24 bg-gray-200 rounded-full">
                          <div className="h-2 bg-health-primary rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Smoking Status</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{mockLifestyle.smoking}</p>
                    <p className="text-sm text-gray-500 mt-1">Updated 6 months ago</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Alcohol Consumption</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="font-medium">{mockLifestyle.alcohol}</p>
                    <p className="text-sm text-gray-500 mt-1">1-2 drinks per week</p>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-3">Sleep Patterns</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">7 hours average</p>
                      <p className="text-sm text-gray-500 mt-1">Typically 11:00 PM to 6:00 AM</p>
                    </div>
                    <div className="h-16 w-40 bg-gray-200 rounded flex items-center justify-center">
                      <p className="text-xs text-gray-400">Sleep Chart Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h3 className="font-semibold mb-3">Dietary Habits</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium mb-2">Balanced diet with occasional processed foods</p>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Fruits & Vegetables</p>
                      <p>Daily</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Protein Intake</p>
                      <p>Adequate</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Water Intake</p>
                      <p>6-8 glasses daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button>
              <Edit className="h-4 w-4 mr-2" /> Update Lifestyle Information
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HealthRecords;


import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/packages/ui-kit";
import { Button } from "@/packages/ui-kit";
import { Calendar, User, Download, FileText } from "lucide-react";

const mockVisitSummaries = {
  "vs-001": {
    id: "vs-001",
    date: "March 10th, 2025",
    time: "3:00 PM",
    doctor: "Dr. Amir Patel",
    specialty: "Cardiologist",
    complaint: "Chest pain and shortness of breath",
    diagnosis: "Stable Angina",
    treatmentPlan: "Medication adjustment and lifestyle modifications",
    followUpRecommendation: "Follow up in 4 weeks",
    medications: [
      { name: "Lisinopril", dosage: "10mg once daily", duration: "30 days" },
      { name: "Aspirin", dosage: "81mg once daily", duration: "30 days" }
    ],
    additionalRecommendations: "Reduce salt intake; Exercise 30 minutes daily; Avoid strenuous activity",
    attachments: ["ECG Report", "Blood Pressure Log"]
  }
};

const VisitSummary = () => {
  const { id } = useParams();
  const summary = id && mockVisitSummaries[id] ? mockVisitSummaries[id] : null;

  if (!summary) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-semibold mb-3">Visit Summary Not Found</h2>
        <p className="mb-4">The summary you're looking for doesn't exist or may have been removed.</p>
        <Link to="/patient/appointments">
          <Button>Return to Appointments</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6 text-health-primary" />
        Visit Summary
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5 text-health-primary" />
            {summary.date} at {summary.time}
          </CardTitle>
          <div className="flex items-center mt-1 text-gray-600">
            <User className="h-4 w-4 mr-1" />
            <span>{summary.doctor} - {summary.specialty}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Chief Complaint</h3>
            <p className="bg-gray-50 p-3 rounded">{summary.complaint}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Diagnosis</h3>
            <p className="bg-gray-50 p-3 rounded">{summary.diagnosis}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Treatment Plan</h3>
            <p className="bg-gray-50 p-3 rounded">{summary.treatmentPlan}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Prescribed Medications</h3>
            <div className="bg-gray-50 p-3 rounded">
              <ul className="list-disc pl-5">
                {summary.medications.map((med, index) => (
                  <li key={index} className="mb-1">
                    <span className="font-medium">{med.name}</span> - {med.dosage} for {med.duration}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Additional Recommendations</h3>
            <div className="bg-gray-50 p-3 rounded">
              {summary.additionalRecommendations.split(';').map((rec, index) => (
                <p key={index} className="mb-1">• {rec.trim()}</p>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-700 mb-1">Follow-up</h3>
            <p className="bg-gray-50 p-3 rounded">{summary.followUpRecommendation}</p>
          </div>
          
          {summary.attachments.length > 0 && (
            <div>
              <h3 className="font-medium text-gray-700 mb-1">Attachments</h3>
              <div className="flex flex-wrap gap-2">
                {summary.attachments.map((attachment, index) => (
                  <Button key={index} variant="outline" size="sm" className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {attachment}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Download className="h-4 w-4 mr-2" /> Download as PDF
          </Button>
        </CardFooter>
      </Card>
      
      <div className="flex justify-between">
        <Link to="/patient/appointments">
          <Button variant="outline">Back to Appointments</Button>
        </Link>
        <Link to="/patient/appointments/book">
          <Button>Book Follow-up</Button>
        </Link>
      </div>
    </div>
  );
};

export default VisitSummary;

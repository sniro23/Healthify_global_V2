import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@healthify/ui-kit";
import { Badge } from "@healthify/ui-kit";
import { Button } from "@healthify/ui-kit";
import { Download, ArrowLeft } from "lucide-react";
import Link from "next/link";

type LabReportDetailProps = {
  id: string;
};

export default function LabReportDetail({ id }: LabReportDetailProps) {
  // In a real app, we would fetch this data based on the ID
  const labReport = {
    id,
    testName: "Complete Blood Count (CBC)",
    orderedDate: "2023-11-10",
    resultDate: "2023-11-12",
    doctor: "Dr. Sarah Johnson",
    status: "completed",
    patientName: "John Doe",
    patientDOB: "1985-04-15",
    results: [
      { name: "Red Blood Cell Count", value: "4.8", unit: "million/μL", range: "4.5-5.5", status: "normal" },
      { name: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13.5-17.5", status: "normal" },
      { name: "Hematocrit", value: "42", unit: "%", range: "41-50", status: "normal" },
      { name: "White Blood Cell Count", value: "7.5", unit: "thousand/μL", range: "4.5-11.0", status: "normal" },
      { name: "Platelet Count", value: "290", unit: "thousand/μL", range: "150-450", status: "normal" }
    ]
  };

  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "completed") {
      return <Badge variant="health">Completed</Badge>;
    } else if (statusLower === "pending") {
      return <Badge variant="secondary">Pending</Badge>;
    } else if (statusLower === "in-progress") {
      return <Badge variant="outline">In Progress</Badge>;
    } else {
      return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderResultIndicator = (value: number, range: string) => {
    const [min, max] = range.split("-").map((n) => parseFloat(n.trim()));
    let variant: "health" | "destructive" | "secondary" = "secondary";

    if (value < min) {
      variant = "destructive";
    } else if (value > max) {
      variant = "destructive";
    } else {
      variant = "health";
    }

    return <Badge variant={variant}>{value}</Badge>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/patient/lab-reports">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Lab Reports
          </Button>
        </Link>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Download Report
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>{labReport.testName}</CardTitle>
              <CardDescription>
                Results from {new Date(labReport.resultDate).toLocaleDateString()}
              </CardDescription>
            </div>
            {getStatusBadge(labReport.status)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Patient</h3>
              <p>{labReport.patientName}</p>
              <p className="text-sm text-gray-500">
                DOB: {new Date(labReport.patientDOB).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Doctor</h3>
              <p>{labReport.doctor}</p>
              <p className="text-sm text-gray-500">
                Ordered: {new Date(labReport.orderedDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-4">Test Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-2 font-medium">Test</th>
                  <th className="pb-2 font-medium">Result</th>
                  <th className="pb-2 font-medium">Unit</th>
                  <th className="pb-2 font-medium">Reference Range</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {labReport.results.map((result, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">{result.name}</td>
                    <td className="py-3 font-medium">{renderResultIndicator(parseFloat(result.value), result.range)}</td>
                    <td className="py-3 text-gray-500">{result.unit}</td>
                    <td className="py-3 text-gray-500">{result.range}</td>
                    <td className="py-3">
                      <Badge variant={result.status === "normal" ? "health" : "destructive"}>
                        {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
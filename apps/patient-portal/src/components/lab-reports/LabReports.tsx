import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@healthify/ui-kit";
import { Badge } from "@healthify/ui-kit";
import { Button } from "@healthify/ui-kit";
import { Download, Eye } from "lucide-react";
import Link from "next/link";

type LabReport = {
  id: string;
  testName: string;
  orderedDate: string;
  resultDate: string;
  doctor: string;
  status: "completed" | "pending" | "in-progress";
};

const mockLabReports: LabReport[] = [
  {
    id: "lab-1",
    testName: "Complete Blood Count (CBC)",
    orderedDate: "2023-11-10",
    resultDate: "2023-11-12",
    doctor: "Dr. Sarah Johnson",
    status: "completed"
  },
  {
    id: "lab-2",
    testName: "Lipid Panel",
    orderedDate: "2023-11-15",
    resultDate: "2023-11-17",
    doctor: "Dr. Michael Chen",
    status: "completed"
  },
  {
    id: "lab-3",
    testName: "Thyroid Function Test",
    orderedDate: "2023-11-20",
    resultDate: "",
    doctor: "Dr. Emma Williams",
    status: "in-progress"
  },
  {
    id: "lab-4",
    testName: "Vitamin D Level",
    orderedDate: "2023-11-25",
    resultDate: "",
    doctor: "Dr. Robert Davis",
    status: "pending"
  }
];

const statusColors = {
  "completed": "health",
  "pending": "secondary",
  "in-progress": "outline"
};

export default function LabReports() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lab Reports</CardTitle>
        <CardDescription>View and download your laboratory test results</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-2 font-medium">Test Name</th>
                <th className="pb-2 font-medium">Ordered Date</th>
                <th className="pb-2 font-medium">Result Date</th>
                <th className="pb-2 font-medium">Doctor</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockLabReports.map((report) => (
                <tr key={report.id} className="border-b">
                  <td className="py-3 font-medium">{report.testName}</td>
                  <td className="py-3">{new Date(report.orderedDate).toLocaleDateString()}</td>
                  <td className="py-3">
                    {report.resultDate 
                      ? new Date(report.resultDate).toLocaleDateString() 
                      : "-"}
                  </td>
                  <td className="py-3">{report.doctor}</td>
                  <td className="py-3">
                    <Badge variant={statusColors[report.status] as any}>
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Link href={`/patient/lab-reports/${report.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 
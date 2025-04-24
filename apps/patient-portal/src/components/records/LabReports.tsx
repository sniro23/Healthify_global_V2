import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@healthify/ui-kit"; 
import { TestTube, FileUp, Search, Download } from "lucide-react";

const LabReports = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const mockLabReports = [
    {
      id: "lab1",
      testName: "Complete Blood Count (CBC)",
      date: "March 15th, 2025",
      status: "Normal",
      isVerified: true,
    },
    {
      id: "lab2",
      testName: "Hemoglobin A1C",
      date: "March 1st, 2025",
      status: "Borderline",
      isVerified: true,
    },
    {
      id: "lab3",
      testName: "Lipid Profile",
      date: "February 20th, 2025",
      status: "Abnormal",
      isVerified: true,
    },
    {
      id: "lab4",
      testName: "Thyroid Function",
      date: "January 10th, 2025",
      status: "Normal",
      isVerified: false,
    }
  ];
  
  const filteredReports = searchTerm ? 
    mockLabReports.filter(report => 
      report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.date.toLowerCase().includes(searchTerm.toLowerCase())
    ) : 
    mockLabReports;
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <TestTube className="h-6 w-6 text-health-primary" />
          Lab Reports
        </h2>
        <Button className="bg-health-primary hover:bg-health-primary/90">
          <FileUp className="h-4 w-4 mr-2" /> Upload Report
        </Button>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search lab reports..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map(report => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row justify-between items-center py-4">
                <div>
                  <CardTitle className="text-lg">{report.testName}</CardTitle>
                  <p className="text-sm text-gray-500">{report.date}</p>
                </div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${report.status === 'Normal' ? 'bg-green-100 text-green-700' : 
                    report.status === 'Borderline' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'}
                `}>
                  {report.status}
                </span>
              </CardHeader>
              <CardContent className="pt-0 pb-4">
                <div className="flex justify-between items-center">
                  <span className={`text-sm flex items-center ${report.isVerified ? 'text-green-600' : 'text-gray-500'}`}>
                    {report.isVerified ? 'Verified by Doctor' : 'Uploaded by Patient'}
                  </span>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Download className="h-3 w-3 mr-1" /> View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Lab Reports Found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 
              "No lab reports match your search." : 
              "You don't have any lab reports yet."}
          </p>
          <Button>Upload Your First Report</Button>
        </div>
      )}
    </div>
  );
};

export default LabReports; 
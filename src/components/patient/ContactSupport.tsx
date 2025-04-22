
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/packages/ui-kit";
import { Bell, MessageCircle, Send, HelpCircle } from "lucide-react";

const ContactSupport = () => {
  const [formData, setFormData] = React.useState({
    category: "",
    subject: "",
    description: "",
    attachments: []
  });
  
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send the data to a backend API
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Bell className="h-6 w-6 text-health-primary" />
        Contact Support
      </h2>
      
      {!submitted ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Submit a Support Request</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="w-full p-2 border rounded-md"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a category</option>
                  <option value="appointment">Appointment Issue</option>
                  <option value="technical">Technical Problem</option>
                  <option value="billing">Billing & Payments</option>
                  <option value="account">Account Access</option>
                  <option value="medical">Medical Question</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-2 border rounded-md"
                  placeholder="Brief summary of your issue"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  className="w-full p-2 border rounded-md"
                  placeholder="Please provide details about your issue"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachments (optional)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                    </div>
                    <input id="file-upload" type="file" className="hidden" />
                  </label>
                </div>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full bg-health-primary hover:bg-health-primary/90">
                  <Send className="h-4 w-4 mr-2" /> Submit Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto text-center p-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <MessageCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h3 className="text-xl font-bold mb-2">Request Submitted Successfully</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. Your request has been received and we will respond shortly.
            A confirmation email has been sent to your registered email address.
          </p>
          <p className="text-gray-600 mb-6">
            Your support ticket ID: <span className="font-semibold">TKT-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </Button>
            <Button className="bg-health-primary hover:bg-health-primary/90">
              <HelpCircle className="h-4 w-4 mr-2" /> Visit Help Center
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ContactSupport;

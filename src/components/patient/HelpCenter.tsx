
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@/packages/ui-kit";
import { HelpCircle, Search, MessageCircle, Phone, FileText, ExternalLink } from "lucide-react";

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can book an appointment by navigating to the Appointments section from the dashboard and clicking on 'Book Appointment'. From there, follow the steps to select a provider, consultation type, and delivery method."
  },
  {
    question: "How do I update my personal information?",
    answer: "You can update your personal information by going to your Profile page and clicking on the edit button next to the section you wish to update."
  },
  {
    question: "How do I view my lab results?",
    answer: "You can view your lab results by navigating to Health Records > Lab Reports. From there, you can see all your lab reports and download them if needed."
  },
  {
    question: "What subscription plans do you offer?",
    answer: "We offer four subscription categories: A, B, C, and D. Each provides different levels of access and included benefits such as free consultations per month. You can view and manage your subscription from the Profile > Payment Settings section."
  },
  {
    question: "How do I message my doctor?",
    answer: "You can message your doctor through the Messages section. You can start a new chat or continue an ongoing conversation with your healthcare provider."
  }
];

const commonIssues = [
  { title: "Appointment Booking Issues", icon: Calendar },
  { title: "Prescription Refills", icon: FileText },
  { title: "Payment and Billing", icon: CreditCard },
  { title: "Technical Support", icon: Settings }
];

// Import missing icons
import { Calendar, CreditCard, Settings } from "lucide-react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredFaqs, setFilteredFaqs] = React.useState(faqs);

  React.useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const filtered = faqs.filter(
        faq => 
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFaqs(filtered);
    }
  }, [searchQuery]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-health-primary" />
        Help Center
      </h2>
      
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for help topics..."
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {commonIssues.map((issue, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-health-highlight flex items-center justify-center mb-4">
                <issue.icon className="h-6 w-6 text-health-primary" />
              </div>
              <h3 className="font-medium mb-2">{issue.title}</h3>
              <p className="text-sm text-gray-600 mb-4">Common questions and solutions</p>
              <Button variant="outline" size="sm">View Solutions</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <div key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-gray-500">
                  No results found for "{searchQuery}". Try a different search term or contact support.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-health-primary" />
                  <div>
                    <p className="font-medium">Chat Support</p>
                    <p className="text-sm text-gray-500">Available 24/7</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-health-primary" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-gray-500">Mon-Fri: 9AM-5PM</p>
                    <p className="text-sm text-gray-500">+1 555-123-4567</p>
                  </div>
                </div>
                <Link to="/patient/contact">
                  <Button className="w-full mt-2">Contact Us</Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <FileText className="h-4 w-4 mr-2" /> 
                      User Guide
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Privacy Policy
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <FileText className="h-4 w-4 mr-2" /> 
                      Terms of Service
                    </Button>
                  </li>
                  <li>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <ExternalLink className="h-4 w-4 mr-2" /> 
                      Health Blog
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;

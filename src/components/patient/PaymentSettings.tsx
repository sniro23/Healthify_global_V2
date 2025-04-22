
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from "@/packages/ui-kit";
import { CreditCard, Download, Calendar, CheckCircle, Clock, ShieldAlert, AlertCircle } from "lucide-react";

const subscriptionPlans = [
  {
    id: "plan-a",
    name: "Category A",
    price: "$29.99/month",
    features: [
      "1 free consultation per month",
      "Basic health tracking",
      "Standard response time",
      "Email support"
    ],
    recommended: false
  },
  {
    id: "plan-b",
    name: "Category B",
    price: "$49.99/month",
    features: [
      "3 free consultations per month",
      "Priority appointment booking",
      "24/7 chat support",
      "Health record sharing"
    ],
    recommended: true
  },
  {
    id: "plan-c",
    name: "Category C",
    price: "$79.99/month",
    features: [
      "5 free consultations per month",
      "Priority specialist access",
      "Dedicated care coordinator",
      "Family account (up to 4 members)",
      "Home visit discounts"
    ],
    recommended: false
  },
  {
    id: "plan-d",
    name: "Category D",
    price: "$149.99/month",
    features: [
      "Unlimited consultations",
      "VIP appointment priority",
      "Concierge healthcare service",
      "Family account (up to 8 members)",
      "Complimentary annual health check",
      "International coverage"
    ],
    recommended: false
  }
];

const billingHistory = [
  {
    id: "inv-001",
    date: "April 15, 2025",
    description: "Monthly Subscription - Category B",
    amount: "$49.99",
    status: "Paid"
  },
  {
    id: "inv-002",
    date: "March 15, 2025",
    description: "Monthly Subscription - Category B",
    amount: "$49.99",
    status: "Paid"
  },
  {
    id: "inv-003",
    date: "February 15, 2025",
    description: "Monthly Subscription - Category A",
    amount: "$29.99",
    status: "Paid"
  },
  {
    id: "inv-004",
    date: "February 3, 2025",
    description: "Specialist Consultation",
    amount: "$75.00",
    status: "Paid"
  }
];

const PaymentSettings = () => {
  const [activeTab, setActiveTab] = React.useState("plans");
  const [currentPlan, setCurrentPlan] = React.useState("plan-b"); // Category B
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-health-primary" />
        Payment Settings
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeTab === "plans" ? "default" : "outline"}
          className={activeTab === "plans" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("plans")}
        >
          Subscription Plans
        </Button>
        <Button
          variant={activeTab === "payment" ? "default" : "outline"}
          className={activeTab === "payment" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("payment")}
        >
          Payment Methods
        </Button>
        <Button
          variant={activeTab === "history" ? "default" : "outline"}
          className={activeTab === "history" ? "bg-health-primary" : ""}
          onClick={() => setActiveTab("history")}
        >
          Billing History
        </Button>
      </div>
      
      {activeTab === "plans" && (
        <div>
          <div className="bg-health-highlight p-4 rounded-lg mb-6 flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="font-semibold text-health-primary">Your Current Plan: {subscriptionPlans.find(plan => plan.id === currentPlan)?.name}</h3>
              <p className="text-gray-600">Next billing date: May 15th, 2025</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Cancel Plan</Button>
              <Button>Manage Plan</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionPlans.map(plan => (
              <Card 
                key={plan.id} 
                className={`${plan.id === currentPlan ? 'border-2 border-health-primary' : ''} ${plan.recommended ? 'relative' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-fit">
                    <Badge className="bg-health-primary px-3">Recommended</Badge>
                  </div>
                )}
                <CardHeader className={`${plan.id === currentPlan ? 'bg-health-highlight' : ''}`}>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-xl font-semibold mt-2">{plan.price}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === currentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button className="w-full bg-health-primary hover:bg-health-primary/90">
                      {plan.price < subscriptionPlans.find(p => p.id === currentPlan)?.price ? "Downgrade" : "Upgrade"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === "payment" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <CreditCard className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">Visa ending in 4242</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <p>Expires 06/2026</p>
                          <Badge variant="outline" className="ml-2 text-xs">Default</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="mt-4">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  John Doe<br />
                  100 Main St<br />
                  Cityville, 12345<br />
                  United States
                </p>
                <Button variant="outline" size="sm">
                  Edit Address
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map((invoice) => (
                <div key={invoice.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-3 border-b last:border-b-0">
                  <div className="mb-2 sm:mb-0">
                    <p className="font-medium">{invoice.description}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {invoice.date}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <p className="font-semibold">{invoice.amount}</p>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      invoice.status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}>
                      {invoice.status}
                    </span>
                    <Button variant="ghost" size="sm" className="ml-auto sm:ml-0">
                      <Download className="h-4 w-4 mr-1" /> Invoice
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PaymentSettings;

'use client';

import React from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@healthify/ui-kit";
import { Plus, Check, Edit, Trash, Power } from "lucide-react";

const mockPlans = [
  {
    id: "plan1",
    name: "Basic",
    price: "$9.99",
    billingCycle: "monthly",
    features: ["Patient portal access", "Basic health tracking", "Email support"],
    isActive: true
  },
  {
    id: "plan2",
    name: "Professional",
    price: "$29.99",
    billingCycle: "monthly",
    features: ["Everything in Basic", "Telemedicine", "Priority support", "Health analytics"],
    isActive: true
  },
  {
    id: "plan3",
    name: "Enterprise",
    price: "Custom",
    billingCycle: "annual",
    features: ["Everything in Professional", "Custom integrations", "Dedicated account manager"],
    isActive: false
  }
];

export default function SubscriptionPlans() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscription Plans</h1>
        <Button className="bg-health-primary hover:bg-health-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add New Plan
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockPlans.map(plan => (
          <Card key={plan.id} className={!plan.isActive ? "opacity-70" : ""}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{plan.name}</CardTitle>
                {!plan.isActive && <span className="text-sm text-gray-500">Inactive</span>}
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm"> / {plan.billingCycle}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {plan.isActive ? (
                  <Button variant="outline" className="flex-1 text-red-500">
                    <Power className="h-4 w-4 mr-1" />
                    Deactivate
                  </Button>
                ) : (
                  <Button variant="outline" className="flex-1 text-green-500">
                    <Power className="h-4 w-4 mr-1" />
                    Activate
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
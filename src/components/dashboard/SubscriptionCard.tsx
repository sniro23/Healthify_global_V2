
import { Activity } from "lucide-react";
import { Card } from "@/packages/ui-kit";

interface SubscriptionTier {
  name: string;
  benefits: string[];
  nextBilling: string;
  price: string;
}

interface SubscriptionCardProps {
  subscription: SubscriptionTier;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <div className="w-full lg:w-auto">
      <div className="bg-health-highlight p-3 rounded-md border border-health-primary/20">
        <div className="flex items-center">
          <div className="bg-health-primary text-white p-1 rounded-md">
            <Activity className="h-5 w-5" />
          </div>
          <div className="ml-2">
            <p className="font-medium text-health-primary">Your Plan: {subscription.name}</p>
            <p className="text-xs text-gray-600">{subscription.price}</p>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-700">
          <ul className="pl-5 list-disc space-y-1">
            {subscription.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

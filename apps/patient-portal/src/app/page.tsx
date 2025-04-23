
import Link from 'next/link';
import { Button } from '@/components/ui';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-health-highlight">
      <div className="text-center">
        <div className="flex justify-center mb-8">
          <img 
            src="/lovable-uploads/859df17a-4941-498f-967c-2c947e2317a4.png"
            alt="Healthify Logo"
            className="h-16 w-auto"
          />
        </div>
        <h1 className="text-4xl font-bold text-health-primary mb-6">Welcome to Healthify</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Your comprehensive healthcare management portal. Access your records, book appointments, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/patient">
            <Button className="bg-health-primary hover:bg-health-primary/90">
              Go to Patient Portal
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

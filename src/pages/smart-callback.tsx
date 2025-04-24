
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { smartClient } from '@/services/auth/smartAuthService';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

const SMARTCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const processCallback = async () => {
      try {
        // Process the authorization response
        const queryParams = new URLSearchParams(window.location.search);
        
        // Check for error parameter
        const errorParam = queryParams.get('error');
        if (errorParam) {
          const errorDescription = queryParams.get('error_description') || 'Unknown error';
          throw new Error(`Authentication error: ${errorParam}. ${errorDescription}`);
        }
        
        // Handle the authorization callback
        await smartClient.handleCallback(queryParams);
        
        // Show success message
        toast({
          title: "Authentication Successful",
          description: "You have been successfully authenticated with SMART on FHIR."
        });
        
        // Navigate back to the application
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        console.error('SMART authentication error:', err);
        setError(err instanceof Error ? err.message : 'Authentication failed');
        
        toast({
          title: "Authentication Failed",
          description: err instanceof Error ? err.message : 'An error occurred during authentication',
          variant: "destructive"
        });
      } finally {
        setIsProcessing(false);
      }
    };

    processCallback();
  }, [navigate, toast]);

  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-xl">SMART on FHIR Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {isProcessing ? (
            <div className="py-6 text-center">
              <Spinner className="mx-auto mb-4" size="lg" />
              <p>Processing authentication response...</p>
            </div>
          ) : error ? (
            <div className="py-6 space-y-4">
              <div className="bg-red-50 p-4 rounded-md border border-red-200">
                <h3 className="text-red-800 font-medium">Authentication Error</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
              <Button 
                onClick={handleReturnHome}
                className="w-full"
              >
                Return to Home
              </Button>
            </div>
          ) : (
            <div className="py-6 space-y-4 text-center">
              <div className="bg-green-50 p-4 rounded-md border border-green-200">
                <h3 className="text-green-800 font-medium">Authentication Successful</h3>
                <p className="text-green-700 mt-1">You will be redirected shortly...</p>
              </div>
              <Button 
                onClick={handleReturnHome}
                className="w-full"
              >
                Return to Application
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SMARTCallback;

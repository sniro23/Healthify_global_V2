
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSMARTAuth } from '@/services/auth/smartAuthService';
import { Spinner } from '@/components/ui/spinner';

const SMARTCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthorized } = useSMARTAuth();
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // The authorization code and state should be processed
    // directly in the useSMARTAuth hook, but we can handle UI here
    
    // Check if we're already authorized after the hook has processed the params
    const checkAuth = setTimeout(() => {
      if (isAuthorized()) {
        navigate('/doctor/dashboard');
      } else {
        // If we're not authorized after a reasonable time,
        // there might have been an error
        const errorMsg = searchParams.get('error') || 'Authorization failed';
        setError(errorMsg);
      }
    }, 3000); // Give the auth process some time
    
    return () => clearTimeout(checkAuth);
  }, [isAuthorized, navigate, searchParams]);
  
  if (error) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-red-600">Authentication Error</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" className="mb-4" />
        <p className="text-lg font-medium text-gray-700">Processing SMART authorization...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
};

export default SMARTCallback;

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useSMARTAuth } from '@/services/auth/smartAuthService';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SMARTAuthButtonProps {
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive" | null;
  size?: "default" | "sm" | "lg" | "icon" | null;
  className?: string;
}

export const SMARTAuthButton: React.FC<SMARTAuthButtonProps> = ({ 
  variant = "default", 
  size = "default",
  className = ""
}) => {
  const { 
    authorize,
    isAuthorized,
    logout,
    getAuthContext,
    refreshTokens
  } = useSMARTAuth();
  
  const { toast } = useToast();
  const authContext = getAuthContext();
  
  // Check token expiration and refresh if needed
  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (isAuthorized() && authContext.tokenExpiresAt) {
        // If token expires in less than 5 minutes, refresh it
        const fiveMinutesFromNow = Date.now() + 5 * 60 * 1000;
        if (authContext.tokenExpiresAt < fiveMinutesFromNow) {
          try {
            await refreshTokens();
            console.log('Token refreshed successfully');
          } catch (error) {
            console.error('Failed to refresh token:', error);
            toast({
              title: "Session Expiring",
              description: "Your session will expire soon. Please log in again.",
              variant: "destructive"
            });
          }
        }
      }
    };
    
    checkTokenExpiration();
    
    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60 * 1000);
    
    return () => clearInterval(interval);
  }, [authContext.tokenExpiresAt, isAuthorized, refreshTokens, toast]);
  
  const handleAuth = () => {
    if (isAuthorized()) {
      logout();
    } else {
      authorize();
    }
  };
  
  return (
    <div>
      {isAuthorized() ? (
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs items-center">
            <ShieldCheck className="h-3 w-3 mr-1" />
            <span>SMART Authorized</span>
          </div>
          <Button
            variant={variant}
            size={size}
            className={className}
            onClick={handleAuth}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </Button>
        </div>
      ) : (
        <Button
          variant={variant}
          size={size}
          className={className}
          onClick={handleAuth}
        >
          <LogIn className="mr-2 h-4 w-4" />
          <span>SMART Login</span>
        </Button>
      )}
    </div>
  );
};

export default SMARTAuthButton;

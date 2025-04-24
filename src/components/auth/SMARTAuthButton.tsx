
import React from 'react';
import { Button } from '@/components/ui/button';
import { useSMARTAuth } from '@/services/auth/smartAuthService';
import { LogIn, LogOut, ShieldCheck } from 'lucide-react';

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
    getAuthContext
  } = useSMARTAuth();
  
  const authContext = getAuthContext();
  
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
          <div className="hidden md:block bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs flex items-center">
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

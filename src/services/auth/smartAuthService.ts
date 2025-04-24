import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fhirclient } from 'fhirclient/lib/lib';
import { Client } from 'fhirclient';

const clientId = 'healthify-portal';
const redirectUri = 'http://localhost:5173';
const scopes = [
  'openid',
  'fhirUser',
  'patient/*.read',
  'observation/*.read',
  'condition/*.read',
  'diagnosticreport/*.read',
  'launch/patient',
  'offline_access'
];

export interface SMARTAuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: number | null;
  subject: string | null;
  patientId: string | null;
  scopes: string[];
}

// Initialize the SMART client
export const smartClient = {
  client: null as Client | null,
  getAuthContext: (): SMARTAuthContext => {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const tokenExpiresAt = localStorage.getItem('token_expires_at');
    const subject = localStorage.getItem('subject');
    const patientId = localStorage.getItem('patient_id');
    const scopes = localStorage.getItem('scopes')?.split(',') || [];
    
    return {
      accessToken,
      refreshToken,
      tokenExpiresAt: tokenExpiresAt ? parseInt(tokenExpiresAt, 10) : null,
      subject,
      patientId,
      scopes
    } as SMARTAuthContext;
  },
  clearAuthContext: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expires_at');
    localStorage.removeItem('subject');
    localStorage.removeItem('patient_id');
    localStorage.removeItem('scopes');
  },
  setAuthContext: (
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    subject: string,
    patientId: string | null,
    scopes: string[]
  ) => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('token_expires_at', (Date.now() + expiresIn * 1000).toString());
    localStorage.setItem('subject', subject);
    localStorage.setItem('patient_id', patientId || '');
    localStorage.setItem('scopes', scopes.join(','));
  }
};

export function useSMARTAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState(smartClient.getAuthContext());
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (code && state) {
      handleAuthorizationResponse(code, state);
    }
  }, [searchParams, navigate]);
  
  const handleAuthorizationResponse = async (code: string, state: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Exchange the authorization code for an access token
      const tokenResponse = await fhirclient(
        {
          clientId,
          scope: scopes.join(' '),
          redirectUri,
        }
      ).auth.token({ code, state });
      
      const accessToken = tokenResponse.access_token;
      const refreshToken = tokenResponse.refresh_token;
      const expiresIn = tokenResponse.expires_in;
      const subject = tokenResponse.patient;
      
      if (!accessToken || !refreshToken || !expiresIn || !subject) {
        throw new Error('Failed to retrieve tokens or subject from token response');
      }
      
      // Fetch the patient ID
      const client = await fhirclient(
        {
          clientId,
          scope: scopes.join(' '),
          redirectUri,
        }
      ).client();
      
      const patient = await client.request(`Patient/${subject}`);
      const patientId = patient.id;
      
      if (!patientId) {
        throw new Error('Failed to retrieve patient ID');
      }
      
      // Set the session
      smartClient.setAuthContext(
        accessToken,
        refreshToken,
        expiresIn,
        subject,
        patientId,
        scopes
      );
      
      setSession({
        accessToken,
        refreshToken,
        tokenExpiresAt: Date.now() + expiresIn * 1000,
        subject,
        patientId,
        scopes
      });
      
      // Remove the code and state from the URL
      searchParams.delete('code');
      searchParams.delete('state');
      navigate({ search: searchParams.toString() }, { replace: true });
    } catch (e: any) {
      console.error('Failed to complete authorization flow', e);
      setError(e.message || 'Failed to complete authorization flow');
    } finally {
      setIsLoading(false);
    }
  };
  
  const authorize = useCallback(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      fhirclient(
        {
          clientId,
          scope: scopes.join(' '),
          redirectUri,
        }
      ).auth.authorize({
        clientId,
        scope: scopes.join(' '),
        redirectUri,
      });
    } catch (e: any) {
      console.error('Failed to initiate authorization flow', e);
      setError(e.message || 'Failed to initiate authorization flow');
      setIsLoading(false);
    }
  }, []);
  
  const logout = useCallback(() => {
    smartClient.clearAuthContext();
    setSession({
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
      subject: null,
      patientId: null,
      scopes: []
    });
  }, []);
  
  const isAuthorized = useCallback(() => {
    return !!session.accessToken && !!session.refreshToken;
  }, [session.accessToken, session.refreshToken]);
  
  const getAuthContext = useCallback(() => {
    return session;
  }, [session]);
  
  const getPatientId = useCallback(() => {
    return session.patientId;
  }, [session.patientId]);
  
  const getAccessToken = useCallback(() => {
    return session.accessToken;
  }, [session.accessToken]);
  
  const hasScope = useCallback((scope: string) => {
    return session.scopes.includes(scope);
  }, [session.scopes]);
  
  const refreshTokens = async () => {
    if (!session.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: session.refreshToken }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to refresh tokens');
      }
      
      const { accessToken, refreshToken, expiresIn } = await response.json();
      
      setSession({
        ...session,
        accessToken,
        refreshToken,
        tokenExpiresAt: Date.now() + expiresIn * 1000,
      });
      
      return accessToken;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      throw error;
    }
  };
  
  return {
    authorize,
    isAuthorized,
    logout,
    getAuthContext,
    getPatientId,
    getAccessToken,
    hasScope,
    refreshTokens,
  };
}

import FHIR from 'fhirclient';
import { oauth2 } from 'fhirclient';
import { TokenResponse } from 'fhirclient/lib/types';

export interface SMARTAuthOptions {
  clientId: string;
  scope: string;
  redirectUri: string;
  iss?: string; // FHIR server base URL
  completeInTarget?: boolean;
}

export interface SMARTAuthContext {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiresAt: number | null;
  subject: string | null;
  patientId: string | null;
  scopes: string[];
}

class SMARTAuthClient {
  private authContext: SMARTAuthContext = {
    accessToken: null,
    refreshToken: null,
    tokenExpiresAt: null,
    subject: null,
    patientId: null,
    scopes: [],
  };

  /**
   * Initialize the SMART authorization flow
   */
  async authorize(options: SMARTAuthOptions): Promise<void> {
    try {
      await oauth2.authorize({
        clientId: options.clientId,
        scope: options.scope,
        redirectUri: options.redirectUri,
        iss: options.iss,
        completeInTarget: options.completeInTarget || false,
      });
    } catch (error) {
      console.error('Failed to initiate SMART authorization flow', error);
      throw error;
    }
  }

  /**
   * Handle the SMART authorization response
   */
  async handleAuthorizationResponse(): Promise<SMARTAuthContext> {
    try {
      const client = await oauth2.ready();
      const tokenResponse = client.state.tokenResponse as TokenResponse;

      if (!tokenResponse || !tokenResponse.access_token) {
        throw new Error('Failed to retrieve access token');
      }

      const accessToken = tokenResponse.access_token;
      const refreshToken = tokenResponse.refresh_token || '';
      const expiresIn = tokenResponse.expires_in || 3600;
      const patientId = client.patient.id;
      const scopes = tokenResponse.scope ? tokenResponse.scope.split(' ') : [];

      // Set the auth context
      this.setAuthContext(
        accessToken,
        refreshToken,
        expiresIn,
        patientId || '',
        patientId,
        scopes
      );

      return this.getAuthContext();
    } catch (error) {
      console.error('Failed to complete authorization flow', error);
      throw error;
    }
  }

  /**
   * Refresh the access token
   */
  async refreshTokens(): Promise<SMARTAuthContext> {
    if (!this.authContext.refreshToken) {
      throw new Error('No refresh token available');
    }

    try {
      // Implementation would depend on the FHIR server's token refresh mechanism
      // This is a placeholder for a real implementation
      throw new Error('Token refresh not implemented');
    } catch (error) {
      console.error('Failed to refresh tokens', error);
      throw error;
    }
  }

  /**
   * Logout and clear the auth context
   */
  logout(): void {
    this.clearAuthContext();
  }

  /**
   * Set the auth context
   */
  setAuthContext(
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    subject: string,
    patientId: string | null,
    scopes: string[]
  ): void {
    this.authContext = {
      accessToken,
      refreshToken,
      tokenExpiresAt: Date.now() + expiresIn * 1000,
      subject,
      patientId,
      scopes,
    };
  }

  /**
   * Get the current auth context
   */
  getAuthContext(): SMARTAuthContext {
    return { ...this.authContext };
  }

  /**
   * Clear the auth context
   */
  clearAuthContext(): void {
    this.authContext = {
      accessToken: null,
      refreshToken: null,
      tokenExpiresAt: null,
      subject: null,
      patientId: null,
      scopes: [],
    };
  }

  /**
   * Check if the user is authorized
   */
  isAuthorized(): boolean {
    return !!this.authContext.accessToken && !!this.authContext.refreshToken;
  }

  /**
   * Check if the user has a specific scope
   */
  hasScope(scope: string): boolean {
    return this.authContext.scopes.includes(scope);
  }

  /**
   * Get the patient ID from the auth context
   */
  getPatientId(): string | null {
    return this.authContext.patientId;
  }

  /**
   * Get the access token
   */
  getAccessToken(): string | null {
    return this.authContext.accessToken;
  }
}

// Singleton instance
export const smartClient = new SMARTAuthClient();

// React hook for SMART authentication
export function useSMARTAuth() {
  return {
    authorize: smartClient.authorize.bind(smartClient),
    handleAuthorizationResponse: smartClient.handleAuthorizationResponse.bind(smartClient),
    refreshTokens: smartClient.refreshTokens.bind(smartClient),
    logout: smartClient.logout.bind(smartClient),
    isAuthorized: smartClient.isAuthorized.bind(smartClient),
    hasScope: smartClient.hasScope.bind(smartClient),
    getAuthContext: smartClient.getAuthContext.bind(smartClient),
    getPatientId: smartClient.getPatientId.bind(smartClient),
    getAccessToken: smartClient.getAccessToken.bind(smartClient),
  };
} 
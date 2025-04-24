
/**
 * SMART on FHIR Authentication Service
 * 
 * Implements OAuth 2.0 support with SMART on FHIR scopes
 * for secure access to FHIR resources.
 */

export interface SMARTAuthConfiguration {
  clientId: string;
  redirectUri: string;
  scope: string;
  iss: string;
  authEndpoint: string;
  tokenEndpoint: string;
}

export interface SMARTAuthContext {
  accessToken: string | null;
  tokenType: string | null;
  expiresIn: number | null;
  scope: string | null;
  subject: string | null;
  patientId: string | null;
  refreshToken: string | null;
  idToken: string | null;
  isAuthenticated: boolean;
}

// Default SMART auth configuration for mock server
const defaultSMARTConfig: SMARTAuthConfiguration = {
  clientId: 'healthify_client',
  redirectUri: `${window.location.origin}/smart-callback`,
  scope: 'launch/patient patient/*.read openid fhirUser',
  iss: 'http://localhost:8000/fhir',
  authEndpoint: 'http://localhost:8000/auth/authorize',
  tokenEndpoint: 'http://localhost:8000/auth/token'
};

/**
 * SMART on FHIR Client for OAuth 2.0 authentication
 */
export class SMARTClient {
  private config: SMARTAuthConfiguration;
  private authContext: SMARTAuthContext = {
    accessToken: null,
    tokenType: null,
    expiresIn: null,
    scope: null,
    subject: null,
    patientId: null,
    refreshToken: null,
    idToken: null,
    isAuthenticated: false
  };

  constructor(config: Partial<SMARTAuthConfiguration> = {}) {
    this.config = {
      ...defaultSMARTConfig,
      ...config
    };
    
    // Try to restore auth context from session storage
    this.restoreAuthContextFromStorage();
  }

  /**
   * Initiate the SMART authorization process
   */
  authorize(): void {
    // Generate a random state parameter to prevent CSRF
    const state = Math.random().toString(36).substring(2);
    sessionStorage.setItem('smart_auth_state', state);
    
    // Construct the authorization URL
    const authUrl = new URL(this.config.authEndpoint);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('client_id', this.config.clientId);
    authUrl.searchParams.append('redirect_uri', this.config.redirectUri);
    authUrl.searchParams.append('scope', this.config.scope);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('aud', this.config.iss);
    
    // Redirect the user to the authorization endpoint
    window.location.href = authUrl.toString();
  }

  /**
   * Handle the authorization callback
   * @param queryParams The query parameters from the callback URL
   */
  async handleCallback(queryParams: URLSearchParams): Promise<SMARTAuthContext> {
    const code = queryParams.get('code');
    const state = queryParams.get('state');
    const error = queryParams.get('error');
    const storedState = sessionStorage.getItem('smart_auth_state');
    
    // Clean up the stored state
    sessionStorage.removeItem('smart_auth_state');
    
    // Check for errors and state mismatch
    if (error) {
      throw new Error(`Authorization error: ${error}`);
    }
    
    if (state !== storedState) {
      throw new Error('State mismatch. Possible CSRF attack.');
    }
    
    if (!code) {
      throw new Error('No authorization code received');
    }
    
    // Exchange the authorization code for tokens
    try {
      // For mock implementation, we'll simulate a successful token response
      if (process.env.NODE_ENV === 'development') {
        const mockTokenResponse = this.getMockTokenResponse(code);
        this.processTokenResponse(mockTokenResponse);
        return this.authContext;
      } else {
        const tokenResponse = await this.fetchTokens(code);
        this.processTokenResponse(tokenResponse);
        return this.authContext;
      }
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      throw error;
    }
  }

  /**
   * Refresh the access token using the refresh token
   */
  async refreshAccessToken(): Promise<SMARTAuthContext> {
    if (!this.authContext.refreshToken) {
      throw new Error('No refresh token available');
    }
    
    try {
      // For mock implementation, we'll simulate a successful token response
      if (process.env.NODE_ENV === 'development') {
        const mockTokenResponse = this.getMockTokenResponse('refresh');
        this.processTokenResponse(mockTokenResponse);
        return this.authContext;
      } else {
        const tokenResponse = await this.fetchTokensWithRefresh();
        this.processTokenResponse(tokenResponse);
        return this.authContext;
      }
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      throw error;
    }
  }

  /**
   * Check if the current user is authorized
   */
  isAuthorized(): boolean {
    return this.authContext.isAuthenticated;
  }

  /**
   * Get the current auth context
   */
  getAuthContext(): SMARTAuthContext {
    return this.authContext;
  }

  /**
   * Get the patient ID from the current context
   */
  getPatientId(): string | null {
    return this.authContext.patientId;
  }

  /**
   * Get the access token for API requests
   */
  getAccessToken(): string | null {
    return this.authContext.accessToken;
  }

  /**
   * Clear the current authorization state
   */
  logout(): void {
    this.authContext = {
      accessToken: null,
      tokenType: null,
      expiresIn: null,
      scope: null,
      subject: null,
      patientId: null,
      refreshToken: null,
      idToken: null,
      isAuthenticated: false
    };
    
    // Clear stored auth context
    sessionStorage.removeItem('smart_auth_context');
  }

  /**
   * Check if the user has a specific scope
   */
  hasScope(scope: string): boolean {
    if (!this.authContext.scope) return false;
    return this.authContext.scope.split(' ').includes(scope);
  }

  /**
   * Helper method to exchange code for tokens
   */
  private async fetchTokens(code: string): Promise<any> {
    const response = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: this.config.clientId,
        redirect_uri: this.config.redirectUri
      })
    });
    
    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }

  /**
   * Helper method to refresh tokens
   */
  private async fetchTokensWithRefresh(): Promise<any> {
    const response = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: this.authContext.refreshToken!,
        client_id: this.config.clientId
      })
    });
    
    if (!response.ok) {
      throw new Error(`Token refresh failed: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  }

  /**
   * Process the token response and update auth context
   */
  private processTokenResponse(tokenResponse: any): void {
    this.authContext = {
      accessToken: tokenResponse.access_token,
      tokenType: tokenResponse.token_type,
      expiresIn: tokenResponse.expires_in,
      scope: tokenResponse.scope,
      subject: tokenResponse.subject,
      patientId: tokenResponse.patient,
      refreshToken: tokenResponse.refresh_token,
      idToken: tokenResponse.id_token,
      isAuthenticated: true
    };
    
    // Store auth context in session storage
    this.saveAuthContextToStorage();
  }

  /**
   * Save auth context to session storage
   */
  private saveAuthContextToStorage(): void {
    sessionStorage.setItem('smart_auth_context', JSON.stringify(this.authContext));
  }

  /**
   * Restore auth context from session storage
   */
  private restoreAuthContextFromStorage(): void {
    const storedContext = sessionStorage.getItem('smart_auth_context');
    if (storedContext) {
      try {
        this.authContext = JSON.parse(storedContext);
      } catch (error) {
        console.error('Failed to parse stored auth context:', error);
      }
    }
  }

  /**
   * Get mock token response for development
   */
  private getMockTokenResponse(code: string): any {
    return {
      access_token: `mock_access_token_${code}_${Date.now()}`,
      token_type: 'Bearer',
      expires_in: 3600,
      scope: this.config.scope,
      subject: 'mock-user-id',
      patient: 'mock-patient-id',
      refresh_token: `mock_refresh_token_${Date.now()}`,
      id_token: `mock_id_token_${Date.now()}`
    };
  }
}

// Create a singleton instance for the application
export const smartClient = new SMARTClient();

// Export a React hook for components
export const useSMARTAuth = () => {
  return {
    authorize: () => smartClient.authorize(),
    isAuthorized: () => smartClient.isAuthorized(),
    getAuthContext: () => smartClient.getAuthContext(),
    getPatientId: () => smartClient.getPatientId(),
    getAccessToken: () => smartClient.getAccessToken(),
    logout: () => smartClient.logout(),
    hasScope: (scope: string) => smartClient.hasScope(scope),
    refreshTokens: () => smartClient.refreshAccessToken(),
  };
};

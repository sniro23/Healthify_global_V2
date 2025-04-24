import FHIR from 'fhirclient';
import Client from 'fhirclient/lib/Client';

// Default FHIR server URL - overridden if provided in environment
const DEFAULT_FHIR_URL = 'http://localhost:8080/fhir';

// Client instance cache
let fhirClient: Client | null = null;

/**
 * Initialize a FHIR client with specific options
 */
export async function initializeFHIRClient(options?: {
  serverUrl?: string;
  tokenResponse?: Record<string, any>;
}): Promise<Client> {
  const serverUrl = options?.serverUrl || process.env.NEXT_PUBLIC_FHIR_SERVER_URL || DEFAULT_FHIR_URL;
  
  if (options?.tokenResponse) {
    fhirClient = await FHIR.oauth2.ready(options.tokenResponse);
  } else {
    fhirClient = FHIR.client({
      serverUrl,
    });
  }
  
  return fhirClient;
}

/**
 * Get the initialized FHIR client instance
 * Will initialize with default settings if not already initialized
 */
export async function getFHIRClient(): Promise<Client> {
  if (!fhirClient) {
    return initializeFHIRClient();
  }
  return fhirClient;
}

/**
 * Reset the FHIR client (useful for logging out/changing contexts)
 */
export function resetFHIRClient(): void {
  fhirClient = null;
} 
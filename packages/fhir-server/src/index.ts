import axios, { AxiosInstance } from 'axios';
import { FHIRError, ValidationError, NotFoundError } from './utils/errors';
import logger from './utils/logger';

// Re-export components
export { FHIRError } from './utils/errors';
export { AuditService } from './resources/AuditService';

// Interface for search parameters
export interface SearchParams {
  [key: string]: string;
}

export interface FHIRClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

/**
 * Client for interacting with FHIR resources
 */
export class FHIRClient {
  private client: AxiosInstance;

  constructor(config: FHIRClientConfig) {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        'Content-Type': 'application/fhir+json',
        'Accept': 'application/fhir+json',
        ...config.headers
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 400:
              throw new ValidationError('Invalid request', data);
            case 404:
              throw new NotFoundError('Resource not found');
            default:
              throw new FHIRError(error.message || 'FHIR server error', status, data);
          }
        }
        throw error;
      }
    );
  }

  async getResource(resourceType: string, id: string) {
    try {
      logger.info(`Fetching ${resourceType}/${id}`);
      const response = await this.client.get(`/${resourceType}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error fetching ${resourceType}/${id}`, error);
      throw error;
    }
  }

  async searchResources(resourceType: string, params: Record<string, string>) {
    try {
      logger.info(`Searching ${resourceType}`, params);
      const response = await this.client.get(`/${resourceType}`, { params });
      return response.data;
    } catch (error) {
      logger.error(`Error searching ${resourceType}`, error);
      throw error;
    }
  }

  async createResource(resource: any) {
    try {
      logger.info(`Creating ${resource.resourceType}`, resource);
      const response = await this.client.post(`/${resource.resourceType}`, resource);
      return response.data;
    } catch (error) {
      logger.error(`Error creating ${resource.resourceType}`, error);
      throw error;
    }
  }

  async updateResource(resource: any) {
    try {
      logger.info(`Updating ${resource.resourceType}/${resource.id}`, resource);
      const response = await this.client.put(`/${resource.resourceType}/${resource.id}`, resource);
      return response.data;
    } catch (error) {
      logger.error(`Error updating ${resource.resourceType}/${resource.id}`, error);
      throw error;
    }
  }

  async deleteResource(resourceType: string, id: string) {
    try {
      logger.info(`Deleting ${resourceType}/${id}`);
      const response = await this.client.delete(`/${resourceType}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting ${resourceType}/${id}`, error);
      throw error;
    }
  }
}

/**
 * Factory function to create a FHIR client
 */
export function createFHIRClient(config?: FHIRClientConfig) {
  const defaultConfig: FHIRClientConfig = {
    baseUrl: process.env.NEXT_PUBLIC_FHIR_SERVER_URL || 'http://localhost:8080/fhir',
    headers: {}
  };

  return new FHIRClient(config || defaultConfig);
}

export * from './utils/errors'; 
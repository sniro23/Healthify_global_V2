import { createClient } from '@supabase/supabase-js';

// Types for API responses
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Base API client configuration
export interface ApiClientConfig {
  baseUrl: string;
  supabaseUrl?: string;
  supabaseKey?: string;
  headers?: Record<string, string>;
}

// Default configuration
const defaultConfig: ApiClientConfig = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
};

// API Client class
export class ApiClient {
  private config: ApiClientConfig;
  private supabase: ReturnType<typeof createClient> | null = null;

  constructor(config: Partial<ApiClientConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
    
    // Initialize Supabase if URLs are provided
    if (this.config.supabaseUrl && this.config.supabaseKey) {
      this.supabase = createClient(
        this.config.supabaseUrl,
        this.config.supabaseKey
      );
    }
  }

  // Get Supabase client
  getSupabase() {
    if (!this.supabase) {
      throw new Error('Supabase client not initialized');
    }
    return this.supabase;
  }

  // Generic fetch method
  async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = endpoint.startsWith('http')
        ? endpoint
        : `${this.config.baseUrl}${endpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.config.headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return { data, error: null, loading: false };
    } catch (error) {
      console.error('API fetch error:', error);
      return {
        data: null,
        error: error instanceof Error ? error : new Error('Unknown error'),
        loading: false,
      };
    }
  }

  // GET method
  async get<T>(endpoint: string, queryParams?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(
      endpoint.startsWith('http') 
        ? endpoint 
        : `${this.config.baseUrl}${endpoint}`
    );
    
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    
    return this.fetch<T>(url.toString(), { method: 'GET' });
  }

  // POST method
  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT method
  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // DELETE method
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.fetch<T>(endpoint, {
      method: 'DELETE',
    });
  }

  // Paginated GET
  async getPaginated<T>(
    endpoint: string,
    page = 1,
    pageSize = 20,
    queryParams?: Record<string, string>
  ): Promise<PaginatedResponse<T>> {
    const params = {
      ...queryParams,
      page: page.toString(),
      pageSize: pageSize.toString(),
    };
    
    const response = await this.get<{
      data: T[];
      count: number;
    }>(endpoint, params);
    
    return {
      data: response.data?.data || null,
      error: response.error,
      loading: response.loading,
      count: response.data?.count || 0,
      page,
      pageSize,
      hasMore: response.data
        ? response.data.count > page * pageSize
        : false,
    };
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

export default apiClient; 
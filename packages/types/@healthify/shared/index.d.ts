declare module '@healthify/shared' {
  // Environment validation
  export function validateServerEnv(): boolean;
  
  // Authentication types and utilities
  export interface User {
    id: string;
    email: string;
    role: 'patient' | 'doctor' | 'admin';
    metadata?: Record<string, any>;
    created_at: string;
    updated_at: string;
  }

  export interface AuthResponse {
    session: any;
    user: User;
    error?: string;
  }

  export interface AuthState {
    user: User | null;
    session: any | null;
    loading: boolean;
    error: string | null;
  }

  export function createAuthStateProvider(): {
    AuthProvider: React.FC<{ children: React.ReactNode }>;
    useAuth: () => AuthState & {
      signIn: (email: string, password: string) => Promise<AuthResponse>;
      signOut: () => Promise<void>;
      signUp: (email: string, password: string, metadata?: any) => Promise<AuthResponse>;
      resetPassword: (email: string) => Promise<{ error?: string }>;
      updateUser: (updates: Partial<User>) => Promise<{ error?: string, user?: User }>;
    };
  };

  // FHIR resources and utilities
  export interface FHIRPatient {
    id: string;
    resourceType: 'Patient';
    name: { given: string[]; family: string; text?: string }[];
    birthDate?: string;
    gender?: string;
    address?: any[];
    telecom?: any[];
    // Add more as needed
  }

  export interface FHIRPractitioner {
    id: string;
    resourceType: 'Practitioner';
    name: { given: string[]; family: string; text?: string }[];
    qualification?: any[];
    telecom?: any[];
    // Add more as needed
  }

  export interface Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: 'scheduled' | 'cancelled' | 'completed' | 'no-show';
    reason?: string;
    notes?: string;
    virtual: boolean;
    virtualMeetingUrl?: string;
  }

  // API utilities
  export function handleApiError(error: any): { status: number; message: string };
  export function validateRequestMethod(req: Request, methods: string[]): boolean;
  
  // Date utilities
  export function formatDateToLocal(date: string | Date, options?: Intl.DateTimeFormatOptions): string;
  export function getCurrentWeekDates(): Date[];
  export function isDateInPast(date: string | Date): boolean;
  
  // Form utilities
  export interface FormField {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    options?: { label: string; value: string }[];
    validation?: (value: any) => string | undefined;
  }

  export function createForm(fields: FormField[]): {
    useForm: () => {
      values: Record<string, any>;
      errors: Record<string, string>;
      touched: Record<string, boolean>;
      handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
      handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
      handleSubmit: (onSubmit: (values: Record<string, any>) => void) => (e: React.FormEvent) => void;
      reset: () => void;
      setFieldValue: (field: string, value: any) => void;
      setFieldError: (field: string, error: string) => void;
    };
  };
}

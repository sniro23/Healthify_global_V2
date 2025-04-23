
/**
 * FHIR Patient Resource Model
 * Based on FHIR R4 specification: https://www.hl7.org/fhir/patient.html
 */

export type AdministrativeGender = 'male' | 'female' | 'other' | 'unknown';

export interface FHIRHumanName {
  use?: 'usual' | 'official' | 'temp' | 'nickname' | 'anonymous' | 'old' | 'maiden';
  text?: string;
  family?: string;
  given?: string[];
  prefix?: string[];
  suffix?: string[];
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRContactPoint {
  system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
  value?: string;
  use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
  rank?: number;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRAddress {
  use?: 'home' | 'work' | 'temp' | 'old' | 'billing';
  type?: 'postal' | 'physical' | 'both';
  text?: string;
  line?: string[];
  city?: string;
  district?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  period?: {
    start?: string;
    end?: string;
  };
}

export interface FHIRPatient {
  resourceType: 'Patient';
  id: string;
  active?: boolean;
  name: FHIRHumanName[];
  telecom?: FHIRContactPoint[];
  gender?: AdministrativeGender;
  birthDate?: string;
  address?: FHIRAddress[];
  maritalStatus?: {
    coding: {
      system: string;
      code: string;
      display: string;
    }[];
    text?: string;
  };
  photo?: {
    contentType?: string;
    url?: string;
    data?: string;
  }[];
  contact?: {
    relationship?: {
      coding: {
        system: string;
        code: string;
        display: string;
      }[];
      text?: string;
    }[];
    name?: FHIRHumanName;
    telecom?: FHIRContactPoint[];
    address?: FHIRAddress;
    gender?: AdministrativeGender;
    organization?: {
      reference: string;
      display?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }[];
  communication?: {
    language: {
      coding: {
        system: string;
        code: string;
        display: string;
      }[];
      text?: string;
    };
    preferred?: boolean;
  }[];
  generalPractitioner?: {
    reference: string;
    display?: string;
  }[];
  managingOrganization?: {
    reference: string;
    display?: string;
  };
}

export const getPatientFullName = (patient: FHIRPatient): string => {
  const primaryName = patient.name.find(n => n.use === 'official') || patient.name[0];
  
  if (primaryName.text) {
    return primaryName.text;
  }
  
  const given = primaryName.given || [];
  const family = primaryName.family || '';
  
  return `${given.join(' ')} ${family}`.trim();
};

export const getPatientGender = (patient: FHIRPatient): string => {
  if (!patient.gender) return 'Unknown';
  
  const genderMap: Record<AdministrativeGender, string> = {
    'male': 'Male',
    'female': 'Female',
    'other': 'Other',
    'unknown': 'Unknown'
  };
  
  return genderMap[patient.gender];
};

export const getPatientAge = (patient: FHIRPatient): string => {
  if (!patient.birthDate) return 'Unknown';
  
  const birthDate = new Date(patient.birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return `${age} years`;
};

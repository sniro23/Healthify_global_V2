
import { FHIRResource } from './common';

/**
 * Extended FHIR Patient resource for Healthify application
 * Extends the base FHIR Patient resource with additional fields used in our application
 */
export interface ExtendedPatient extends FHIRResource {
  resourceType: 'Patient';
  id?: string;
  meta?: {
    versionId?: string;
    lastUpdated?: string;
    profile?: string[];
    security?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
    tag?: Array<{
      system: string;
      code: string;
      display?: string;
    }>;
  };
  identifier?: Array<{
    use?: 'usual' | 'official' | 'temp' | 'secondary' | 'old';
    type?: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    system?: string;
    value?: string;
    period?: {
      start?: string;
      end?: string;
    };
    assigner?: {
      display?: string;
      reference?: string;
    };
  }>;
  active?: boolean;
  name?: Array<{
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
  }>;
  telecom?: Array<{
    system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
    value?: string;
    use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
    rank?: number;
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  gender?: 'male' | 'female' | 'other' | 'unknown';
  birthDate?: string;
  deceasedBoolean?: boolean;
  deceasedDateTime?: string;
  address?: Array<{
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
  }>;
  maritalStatus?: {
    coding?: Array<{
      system?: string;
      code?: string;
      display?: string;
    }>;
    text?: string;
  };
  multipleBirthBoolean?: boolean;
  multipleBirthInteger?: number;
  photo?: Array<{
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: string;
  }>;
  contact?: Array<{
    relationship?: Array<{
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    }>;
    name?: {
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
    };
    telecom?: Array<{
      system?: 'phone' | 'fax' | 'email' | 'pager' | 'url' | 'sms' | 'other';
      value?: string;
      use?: 'home' | 'work' | 'temp' | 'old' | 'mobile';
      rank?: number;
      period?: {
        start?: string;
        end?: string;
      };
    }>;
    address?: {
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
    };
    gender?: 'male' | 'female' | 'other' | 'unknown';
    organization?: {
      reference?: string;
      display?: string;
    };
    period?: {
      start?: string;
      end?: string;
    };
  }>;
  communication?: Array<{
    language: {
      coding?: Array<{
        system?: string;
        code?: string;
        display?: string;
      }>;
      text?: string;
    };
    preferred?: boolean;
  }>;
  generalPractitioner?: Array<{
    reference?: string;
    display?: string;
  }>;
  managingOrganization?: {
    reference?: string;
    display?: string;
  };
  link?: Array<{
    other: {
      reference: string;
    };
    type: 'replaced-by' | 'replaces' | 'refer' | 'seealso';
  }>;

  // Healthify specific extensions
  healthifyExtensions?: {
    portalPreferences?: {
      notifications?: {
        email?: boolean;
        sms?: boolean;
        push?: boolean;
      };
      appointmentReminders?: boolean;
      medicationReminders?: boolean;
      language?: string;
      theme?: 'light' | 'dark' | 'system';
    };
    insuranceDetails?: Array<{
      provider: string;
      policyNumber: string;
      groupNumber?: string;
      planType?: string;
      startDate: string;
      endDate?: string;
      isPrimary: boolean;
    }>;
    consentForms?: Array<{
      name: string;
      signed: boolean;
      signedDate?: string;
      documentReference?: string;
    }>;
    emergencyContacts?: Array<{
      name: string;
      relationship: string;
      phone: string;
      email?: string;
      isEmergencyContact: boolean;
    }>;
    lastPortalAccess?: string;
  };
}

/**
 * Get the display name for a patient
 */
export function getPatientDisplayName(patient: ExtendedPatient): string {
  if (!patient.name || patient.name.length === 0) {
    return 'Unknown Patient';
  }
  
  const name = patient.name[0];
  const familyName = name.family || '';
  const givenName = (name.given && name.given.length > 0) ? name.given[0] : '';
  
  if (familyName && givenName) {
    return `${givenName} ${familyName}`;
  } else if (familyName) {
    return familyName;
  } else if (givenName) {
    return givenName;
  } else {
    return 'Unknown Patient';
  }
}

/**
 * Get the patient age from birthDate
 */
export function getPatientAge(patient: ExtendedPatient): number | null {
  if (!patient.birthDate) {
    return null;
  }
  
  const birthDate = new Date(patient.birthDate);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

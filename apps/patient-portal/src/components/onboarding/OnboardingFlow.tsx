'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@healthify/ui-kit';
import Stepper from './Stepper';
import { UserCircle, ClipboardList, Stethoscope, Building } from 'lucide-react';
import { createFHIRClient } from '@healthify/fhir-server';

// Reusing Profile components
import PersonalInfoForm from './steps/PersonalInfoForm';
import MedicalHistoryForm from './steps/MedicalHistoryForm';
import HealthcareProvidersForm from './steps/HealthcareProvidersForm';
import InsuranceForm from './steps/InsuranceForm';

const STEPS = [
  'Personal Info',
  'Medical History',
  'Healthcare Providers',
  'Insurance'
];

// Zod schemas for validation
const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().min(1, 'Gender is required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Zip code is required')
});

const medicalHistorySchema = z.object({
  conditions: z.string().optional(),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  surgeries: z.string().optional(),
  familyHistory: z.string().optional(),
  lifestyleFactors: z.object({
    smoking: z.string().optional(),
    alcohol: z.string().optional(),
    exercise: z.string().optional(),
    diet: z.string().optional()
  }).optional()
});

const healthcareProvidersSchema = z.object({
  primaryCare: z.object({
    name: z.string().min(1, 'Provider name is required'),
    specialty: z.string().min(1, 'Specialty is required'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().optional()
  }).optional(),
  specialists: z.array(
    z.object({
      name: z.string().min(1, 'Provider name is required'),
      specialty: z.string().min(1, 'Specialty is required'),
      phone: z.string().min(1, 'Phone number is required'),
      address: z.string().optional()
    })
  ).optional()
});

const insuranceSchema = z.object({
  provider: z.string().min(2, 'Insurance provider is required'),
  policyNumber: z.string().min(5, 'Policy number is required'),
  groupNumber: z.string().optional(),
  coverageType: z.string().min(1, 'Coverage type is required'),
  policyHolder: z.string().optional(),
  relationship: z.string().optional()
});

// Combined schema
const formSchema = z.object({
  personalInfo: personalInfoSchema,
  medicalHistory: medicalHistorySchema,
  healthcareProviders: healthcareProvidersSchema,
  insurance: insuranceSchema
});

type FormData = z.infer<typeof formSchema>;

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const fhirClient = createFHIRClient();
  
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: '',
      address: '',
      city: '',
      state: '',
      zipCode: ''
    },
    medicalHistory: {},
    healthcareProviders: {},
    insurance: {
      provider: '',
      policyNumber: '',
      coverageType: ''
    }
  });
  
  const updateFormData = (step: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [step]: data
    }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Map form data to FHIR resources
  const mapToFHIRPatient = () => {
    const { personalInfo } = formData;
    
    return {
      resourceType: 'Patient',
      name: [
        {
          use: 'official',
          family: personalInfo.lastName,
          given: [personalInfo.firstName]
        }
      ],
      gender: personalInfo.gender.toLowerCase(),
      birthDate: personalInfo.dateOfBirth,
      telecom: [
        {
          system: 'phone',
          value: personalInfo.phone,
          use: 'home'
        },
        {
          system: 'email',
          value: personalInfo.email
        }
      ],
      address: [
        {
          use: 'home',
          line: [personalInfo.address],
          city: personalInfo.city,
          state: personalInfo.state,
          postalCode: personalInfo.zipCode
        }
      ]
    };
  };
  
  const mapToFHIRConditions = () => {
    const { medicalHistory } = formData;
    
    if (!medicalHistory.conditions) return [];
    
    // Split by commas and create a condition for each
    return medicalHistory.conditions.split(',').map(condition => ({
      resourceType: 'Condition',
      code: {
        text: condition.trim()
      },
      subject: {
        reference: 'Patient/{patientId}' // This would be populated after patient creation
      },
      recordedDate: new Date().toISOString()
    }));
  };

  const handleSubmit = async () => {
    try {
      // Convert to FHIR resources
      const patientResource = mapToFHIRPatient();
      
      // Save patient to FHIR server
      const patientResponse = await fhirClient.createResource(patientResource);
      const patientId = patientResponse.id;
      
      // Create conditions with reference to the patient
      const conditions = mapToFHIRConditions().map(condition => ({
        ...condition,
        subject: {
          reference: `Patient/${patientId}`
        }
      }));
      
      // Save conditions
      for (const condition of conditions) {
        await fhirClient.createResource(condition);
      }
      
      // Redirect to dashboard after completion
      router.push('/patient/dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const stepIcons = [
    <UserCircle key="user" className="h-6 w-6 text-health-primary" />,
    <ClipboardList key="clipboard" className="h-6 w-6 text-health-primary" />,
    <Stethoscope key="stethoscope" className="h-6 w-6 text-health-primary" />,
    <Building key="building" className="h-6 w-6 text-health-primary" />
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm 
          data={formData.personalInfo} 
          updateData={(data) => updateFormData('personalInfo', data)} 
        />;
      case 1:
        return <MedicalHistoryForm 
          data={formData.medicalHistory} 
          updateData={(data) => updateFormData('medicalHistory', data)} 
        />;
      case 2:
        return <HealthcareProvidersForm 
          data={formData.healthcareProviders} 
          updateData={(data) => updateFormData('healthcareProviders', data)} 
        />;
      case 3:
        return <InsuranceForm 
          data={formData.insurance} 
          updateData={(data) => updateFormData('insurance', data)} 
        />;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
        <p className="text-gray-600">
          Please provide your information to get started with Healthify
        </p>
      </div>

      <Stepper 
        steps={STEPS} 
        currentStep={currentStep} 
        onStepChange={setCurrentStep} 
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {stepIcons[currentStep]}
            {STEPS[currentStep]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          Back
        </Button>
        
        <Button
          onClick={handleNext}
          className="bg-health-primary hover:bg-health-primary/90"
        >
          {currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
} 
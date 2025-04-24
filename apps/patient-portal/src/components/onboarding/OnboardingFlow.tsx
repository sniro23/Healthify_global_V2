'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@healthify/ui-kit';
import Stepper from './Stepper';
import { UserCircle, ClipboardList, Stethoscope, Building } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    personalInfo: {},
    medicalHistory: {},
    healthcareProviders: {},
    insurance: {}
  });
  
  const updateFormData = (step: string, data: any) => {
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

  const handleSubmit = async () => {
    try {
      // Submit data to the backend
      // For now, just log it and redirect
      console.log('Form data submitted:', formData);
      
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
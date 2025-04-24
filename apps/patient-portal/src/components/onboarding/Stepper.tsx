import React from 'react';
import { Button } from '@healthify/ui-kit';
import { CheckCircle, Circle } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full">
      {/* Step indicators */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <button
              onClick={() => index < currentStep && onStepChange(index)}
              disabled={index > currentStep}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                index < currentStep
                  ? 'bg-health-primary text-white'
                  : index === currentStep
                  ? 'bg-health-primary text-white'
                  : 'bg-gray-200 text-gray-500'
              } transition-colors duration-200`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-6 h-6" />
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
            
            {/* Step label */}
            <span className={`ml-2 text-sm font-medium ${
              index <= currentStep ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step}
            </span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[2px] mx-4 ${
                index < currentStep ? 'bg-health-primary' : 'bg-gray-200'
              }`} style={{ width: '50px' }}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
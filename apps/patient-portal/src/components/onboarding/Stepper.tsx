'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
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
            <span className={`mt-2 text-sm font-medium ${
              index <= currentStep ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {step}
            </span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div 
                className={`hidden sm:block absolute left-0 right-0 h-[2px] ${
                  index < currentStep ? 'bg-health-primary' : 'bg-gray-200'
                }`}
                style={{ 
                  width: `calc(100% - ${steps.length * 20}px)`,
                  left: `calc(${index * (100 / (steps.length - 1))}% + 25px)`,
                  top: '20px'
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 
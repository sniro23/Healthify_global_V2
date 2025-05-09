import React from 'react';
interface StepperProps {
    steps: string[];
    currentStep: number;
    onStepChange: (step: number) => void;
}
export default function Stepper({ steps, currentStep, onStepChange }: StepperProps): React.JSX.Element;
export {};
//# sourceMappingURL=Stepper.d.ts.map
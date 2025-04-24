/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Stepper from '../../../components/onboarding/Stepper';

describe('Stepper Component', () => {
  const mockSteps = ['Step 1', 'Step 2', 'Step 3'];
  const mockOnStepChange = jest.fn();
  
  beforeEach(() => {
    mockOnStepChange.mockClear();
  });

  it('renders all steps', () => {
    render(
      <Stepper 
        steps={mockSteps} 
        currentStep={0} 
        onStepChange={mockOnStepChange} 
      />
    );
    
    mockSteps.forEach(step => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });

  it('marks current step with the primary color', () => {
    render(
      <Stepper 
        steps={mockSteps} 
        currentStep={1} 
        onStepChange={mockOnStepChange} 
      />
    );
    
    // First step should show a check icon (completed)
    expect(screen.getByText('Step 1').closest('div')?.querySelector('svg')).toBeInTheDocument();
    
    // Second step should be highlighted as current
    const step2Container = screen.getByText('Step 2').closest('div');
    const step2Button = step2Container?.querySelector('button');
    expect(step2Button).toHaveClass('bg-health-primary');
    
    // Third step should be inactive
    const step3Container = screen.getByText('Step 3').closest('div');
    const step3Button = step3Container?.querySelector('button');
    expect(step3Button).toHaveClass('bg-gray-200');
  });

  it('allows clicking on previous steps', () => {
    render(
      <Stepper 
        steps={mockSteps} 
        currentStep={2} 
        onStepChange={mockOnStepChange} 
      />
    );
    
    // Find the button for Step 1
    const step1Container = screen.getByText('Step 1').closest('div');
    const step1Button = step1Container?.querySelector('button');
    
    // Click on Step 1
    if (step1Button) {
      fireEvent.click(step1Button);
      expect(mockOnStepChange).toHaveBeenCalledWith(0);
    }
  });

  it('disables clicking on future steps', () => {
    render(
      <Stepper 
        steps={mockSteps} 
        currentStep={0} 
        onStepChange={mockOnStepChange} 
      />
    );
    
    // Try clicking on Step 3 (future step)
    const step3Container = screen.getByText('Step 3').closest('div');
    const step3Button = step3Container?.querySelector('button');
    
    // Step 3 button should be disabled
    if (step3Button) {
      expect(step3Button).toBeDisabled();
      fireEvent.click(step3Button);
      expect(mockOnStepChange).not.toHaveBeenCalled();
    }
  });
}); 
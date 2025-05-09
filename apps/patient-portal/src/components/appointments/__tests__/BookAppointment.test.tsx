import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookAppointment } from '../BookAppointment';
import { useAuth } from '@/hooks/useAuth';
import { fhirClient } from '@/lib/fhir/client';

// Mock the hooks and modules
jest.mock('@/hooks/useAuth');
jest.mock('@/lib/fhir/client');

describe('BookAppointment', () => {
  const mockUser = {
    id: '123',
    email: 'test@example.com',
  };

  const mockPractitioners = [
    {
      id: '1',
      name: [{ text: 'Dr. John Doe' }],
    },
    {
      id: '2',
      name: [{ text: 'Dr. Jane Smith' }],
    },
  ];

  const mockAvailableSlots = [
    '2024-03-20T09:00:00',
    '2024-03-20T09:30:00',
    '2024-03-20T10:00:00',
  ];

  beforeEach(() => {
    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    });

    // Mock fhirClient methods
    (fhirClient.searchResources as jest.Mock).mockResolvedValue(mockPractitioners);
    (fhirClient.getAvailableSlots as jest.Mock).mockResolvedValue(mockAvailableSlots);
    (fhirClient.createResource as jest.Mock).mockResolvedValue({
      id: 'new-appointment-id',
      status: 'booked',
    });
  });

  it('renders the booking form', () => {
    render(<BookAppointment />);
    
    expect(screen.getByText('Book an Appointment')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Practitioner')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Reason for Visit')).toBeInTheDocument();
  });

  it('loads practitioners on mount', async () => {
    render(<BookAppointment />);
    
    await waitFor(() => {
      expect(fhirClient.searchResources).toHaveBeenCalledWith('Practitioner', {});
    });

    const practitionerSelect = screen.getByLabelText('Select Practitioner');
    expect(practitionerSelect).toHaveValue('');
    
    fireEvent.change(practitionerSelect, { target: { value: '1' } });
    expect(practitionerSelect).toHaveValue('1');
  });

  it('loads available slots when practitioner and date are selected', async () => {
    render(<BookAppointment />);
    
    const practitionerSelect = screen.getByLabelText('Select Practitioner');
    const dateInput = screen.getByLabelText('Select Date');

    fireEvent.change(practitionerSelect, { target: { value: '1' } });
    fireEvent.change(dateInput, { target: { value: '2024-03-20' } });

    await waitFor(() => {
      expect(fhirClient.getAvailableSlots).toHaveBeenCalledWith('1', '2024-03-20');
    });

    // Check if time slots are rendered
    mockAvailableSlots.forEach(slot => {
      expect(screen.getByText(new Date(slot).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))).toBeInTheDocument();
    });
  });

  it('submits the appointment booking form', async () => {
    const onSuccess = jest.fn();
    render(<BookAppointment onSuccess={onSuccess} />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText('Select Practitioner'), {
      target: { value: '1' },
    });
    fireEvent.change(screen.getByLabelText('Select Date'), {
      target: { value: '2024-03-20' },
    });
    
    await waitFor(() => {
      const timeSlot = screen.getByText('9:00 AM');
      fireEvent.click(timeSlot);
    });

    fireEvent.change(screen.getByLabelText('Reason for Visit'), {
      target: { value: 'Regular checkup' },
    });

    // Submit the form
    fireEvent.click(screen.getByText('Book Appointment'));

    await waitFor(() => {
      expect(fhirClient.createResource).toHaveBeenCalledWith(
        expect.objectContaining({
          resourceType: 'Appointment',
          status: 'booked',
          participant: expect.arrayContaining([
            expect.objectContaining({
              actor: { reference: 'Patient/123' },
              status: 'accepted',
            }),
          ]),
          reasonCode: [
            { text: 'Regular checkup' },
          ],
        })
      );
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it('handles errors gracefully', async () => {
    const error = new Error('Failed to load practitioners');
    (fhirClient.searchResources as jest.Mock).mockRejectedValue(error);

    render(<BookAppointment />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load practitioners')).toBeInTheDocument();
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    const onCancel = jest.fn();
    render(<BookAppointment onCancel={onCancel} />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalled();
  });
}); 
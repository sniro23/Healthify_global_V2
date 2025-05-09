import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AppointmentsPage from '../page';
import { useAuth } from '@/hooks/useAuth';
import { fhirClient } from '@/lib/fhir/client';

// Mock the hooks and modules
jest.mock('@/hooks/useAuth');
jest.mock('@/lib/fhir/client');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('AppointmentsPage', () => {
  const mockUser = {
    id: '123',
    email: 'test@example.com',
  };

  const mockAppointments = [
    {
      id: '1',
      status: 'booked',
      start: '2024-03-20T09:00:00',
      participant: [
        {
          actor: {
            reference: 'Patient/123',
            display: 'John Doe',
          },
          status: 'accepted',
        },
        {
          actor: {
            reference: 'Practitioner/1',
            display: 'Dr. Jane Smith',
          },
          status: 'accepted',
        },
      ],
      reasonCode: [
        {
          text: 'Regular checkup',
        },
      ],
    },
    {
      id: '2',
      status: 'cancelled',
      start: '2024-03-21T10:00:00',
      participant: [
        {
          actor: {
            reference: 'Patient/123',
            display: 'John Doe',
          },
          status: 'accepted',
        },
        {
          actor: {
            reference: 'Practitioner/2',
            display: 'Dr. John Doe',
          },
          status: 'accepted',
        },
      ],
      reasonCode: [
        {
          text: 'Follow-up',
        },
      ],
    },
  ];

  beforeEach(() => {
    // Mock useAuth hook
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: false,
      error: null,
    });

    // Mock fhirClient methods
    (fhirClient.getAppointments as jest.Mock).mockResolvedValue(mockAppointments);
    (fhirClient.updateResource as jest.Mock).mockResolvedValue({
      ...mockAppointments[0],
      status: 'cancelled',
    });
  });

  it('renders the appointments page', async () => {
    render(<AppointmentsPage />);

    expect(screen.getByText('My Appointments')).toBeInTheDocument();
    expect(screen.getByText('Book New Appointment')).toBeInTheDocument();

    // Wait for appointments to load
    await waitFor(() => {
      expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Dr. John Doe')).toBeInTheDocument();
    });
  });

  it('displays loading state', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      loading: true,
      error: null,
    });

    render(<AppointmentsPage />);
    expect(screen.getByText('Loading appointments...')).toBeInTheDocument();
  });

  it('displays error state', async () => {
    const error = new Error('Failed to load appointments');
    (fhirClient.getAppointments as jest.Mock).mockRejectedValue(error);

    render(<AppointmentsPage />);

    await waitFor(() => {
      expect(screen.getByText('Failed to load appointments')).toBeInTheDocument();
    });
  });

  it('displays empty state when no appointments', async () => {
    (fhirClient.getAppointments as jest.Mock).mockResolvedValue([]);

    render(<AppointmentsPage />);

    await waitFor(() => {
      expect(screen.getByText('No appointments found. Book your first appointment!')).toBeInTheDocument();
    });
  });

  it('cancels an appointment', async () => {
    render(<AppointmentsPage />);

    // Wait for appointments to load
    await waitFor(() => {
      expect(screen.getByText('Dr. Jane Smith')).toBeInTheDocument();
    });

    // Find and click the cancel button for the first appointment
    const cancelButton = screen.getAllByText('Cancel')[0];
    fireEvent.click(cancelButton);

    // Verify the appointment was cancelled
    await waitFor(() => {
      expect(fhirClient.updateResource).toHaveBeenCalledWith(
        expect.objectContaining({
          id: '1',
          status: 'cancelled',
        })
      );
    });
  });

  it('navigates to new appointment page', async () => {
    const { useRouter } = require('next/navigation');
    const mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });

    render(<AppointmentsPage />);

    const newAppointmentButton = screen.getByText('Book New Appointment');
    fireEvent.click(newAppointmentButton);

    expect(mockPush).toHaveBeenCalledWith('/appointments/new');
  });
}); 
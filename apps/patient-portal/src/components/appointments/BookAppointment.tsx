'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@healthify/ui-kit';
import { Calendar, Clock, MapPin, Phone, User, Video, MessageCircle } from 'lucide-react';
import { createFHIRClient } from '@healthify/fhir-server';
import { useAuth } from '@/hooks/useAuth';
import { fhirClient } from '@/lib/fhir/client';
import { format, parseISO, addDays } from 'date-fns';
import type { Practitioner } from '@healthify/fhir-types';

// Appointment form schema
const appointmentSchema = z.object({
  appointmentType: z.string().min(1, 'Please select a provider type'),
  consultationType: z.string().min(1, 'Please select a consultation type'),
  appointmentDate: z.string().optional(),
  appointmentTime: z.string().optional(),
  deliveryMethod: z.string().optional(),
  notes: z.string().optional()
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface BookAppointmentProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const BookAppointment: React.FC<BookAppointmentProps> = ({
  onSuccess,
  onCancel,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const fhirClient = createFHIRClient();
  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      appointmentType: '',
      consultationType: '',
      deliveryMethod: '',
      notes: ''
    }
  });
  
  // Watch values to determine flow
  const appointmentType = watch('appointmentType');
  const consultationType = watch('consultationType');
  const deliveryMethod = watch('deliveryMethod');
  
  // Check for mobile on client side
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch practitioners
  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const data = await fhirClient.searchResources('Practitioner', {});
        setPractitioners(data);
      } catch (err) {
        setError('Failed to load practitioners');
        console.error(err);
      }
    };
    fetchPractitioners();
  }, []);

  // Fetch available slots when practitioner and date are selected
  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedPractitioner && selectedDate) {
        try {
          const slots = await fhirClient.getAvailableSlots(selectedPractitioner, selectedDate);
          setAvailableSlots(slots);
        } catch (err) {
          setError('Failed to load available slots');
          console.error(err);
        }
      }
    };
    fetchSlots();
  }, [selectedPractitioner, selectedDate]);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step submission
      onSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/patient/appointments');
    }
  };
  
  // Map form data to FHIR Appointment resource
  const mapToFHIRAppointment = (data: AppointmentFormData) => {
    return {
      resourceType: 'Appointment',
      status: 'proposed',
      appointmentType: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/appointment-type',
            code: data.appointmentType.toLowerCase(),
            display: data.appointmentType
          }
        ]
      },
      reason: [
        {
          text: data.consultationType
        }
      ],
      description: data.notes || 'No additional notes provided',
      start: data.appointmentDate && data.appointmentTime 
        ? `${data.appointmentDate}T${data.appointmentTime}:00` 
        : undefined,
      end: data.appointmentDate && data.appointmentTime 
        ? `${data.appointmentDate}T${data.appointmentTime}:30` // Assuming 30 min appointments
        : undefined,
      participant: [
        {
          status: 'needs-action',
          actor: {
            reference: 'Patient/current-user-id', // This would be the actual patient ID
            display: 'Current User'
          }
        },
        {
          status: 'needs-action',
          type: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/participant-type',
                  code: 'PPRF',
                  display: 'Primary Performer'
                }
              ]
            }
          ],
          actor: {
            reference: 'Practitioner/to-be-assigned' // This would be assigned later
          }
        }
      ]
    };
  };

  const onSubmit = async () => {
    try {
      const formData = {
        appointmentType,
        consultationType, 
        appointmentDate: watch('appointmentDate'),
        appointmentTime: watch('appointmentTime'),
        deliveryMethod,
        notes: watch('notes')
      };
      
      // Convert to FHIR Appointment resource
      const appointmentResource = mapToFHIRAppointment(formData);
      
      // Save to FHIR server
      await fhirClient.createResource(appointmentResource);
      
      // Redirect to appointments page
      router.push('/patient/appointments');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className={`max-w-3xl mx-auto ${isMobile ? 'px-2' : ''}`}>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-2">
        <Calendar className="h-5 w-5 md:h-6 md:w-6 text-health-primary" />
        Book an Appointment
      </h2>

      <Card className="mb-6 max-w-full">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-lg flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-health-primary text-white mr-2 flex-shrink-0">
              {step}
            </div>
            <span className="truncate">
              {step === 1 && "Select Provider Type"}
              {step === 2 && "Select Consultation Type"}
              {step === 3 && "Select Delivery Method"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="py-3 px-3 md:py-4 md:px-4">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Doctor", "Therapist", "Physiotherapist"].map((type) => (
                <Button
                  key={type}
                  variant={appointmentType === type ? "primary" : "outline"}
                  className={`h-16 sm:h-20 flex-col ${appointmentType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setValue('appointmentType', type)}
                >
                  <User className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />
                  <span className="text-xs sm:text-sm">{type}</span>
                </Button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Urgent", "Scheduled", "Home Visit"].map((type) => (
                <Button
                  key={type}
                  variant={consultationType === type ? "primary" : "outline"}
                  className={`h-16 sm:h-20 flex-col ${consultationType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setValue('consultationType', type)}
                >
                  {type === "Urgent" && <Clock className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  {type === "Scheduled" && <Calendar className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  {type === "Home Visit" && <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  <span className="text-xs sm:text-sm">{type}</span>
                </Button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div>
              {consultationType === "Urgent" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {["Video", "Phone", "In-Person"].map((method) => (
                      <Button
                        key={method}
                        variant={deliveryMethod === method ? "primary" : "outline"}
                        className={`h-16 sm:h-20 flex-col ${deliveryMethod === method ? "bg-health-primary" : "border-gray-300"}`}
                        onClick={() => setValue('deliveryMethod', method)}
                      >
                        {method === "Video" && <Video className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        {method === "Phone" && <Phone className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        {method === "In-Person" && <User className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        <span className="text-xs sm:text-sm">{method}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-32"
                      placeholder="Describe your symptoms or reason for the urgent appointment..."
                      {...register('notes')}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {consultationType === "Scheduled" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {["Video", "Phone", "In-Person"].map((method) => (
                      <Button
                        key={method}
                        variant={deliveryMethod === method ? "primary" : "outline"}
                        className={`h-16 sm:h-20 flex-col ${deliveryMethod === method ? "bg-health-primary" : "border-gray-300"}`}
                        onClick={() => setValue('deliveryMethod', method)}
                      >
                        {method === "Video" && <Video className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        {method === "Phone" && <Phone className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        {method === "In-Person" && <User className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                        <span className="text-xs sm:text-sm">{method}</span>
                      </Button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Date
                      </label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-md"
                        {...register('appointmentDate')}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Time
                      </label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        {...register('appointmentTime')}
                      >
                        <option value="">Select a time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="13:00">1:00 PM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-32"
                      placeholder="Any additional information for your provider..."
                      {...register('notes')}
                    ></textarea>
                  </div>
                </div>
              )}
              
              {consultationType === "Home Visit" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-md"
                      {...register('appointmentDate')}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Time Range
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      {...register('appointmentTime')}
                    >
                      <option value="">Select a time range</option>
                      <option value="09:00">Morning (9 AM - 12 PM)</option>
                      <option value="13:00">Afternoon (1 PM - 5 PM)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea 
                      className="w-full p-2 border rounded-md h-32"
                      placeholder="Please provide details about your symptoms and address information..."
                      {...register('notes')}
                    ></textarea>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack}>
          {step === 1 ? "Cancel" : "Back"}
        </Button>
        <Button
          className="bg-health-primary hover:bg-health-primary/90"
          onClick={handleNext}
          disabled={
            (step === 1 && !appointmentType) ||
            (step === 2 && !consultationType) ||
            (step === 3 && !deliveryMethod)
          }
        >
          {step === 3 ? "Book Appointment" : "Next"}
        </Button>
      </div>
    </div>
  );
}; 
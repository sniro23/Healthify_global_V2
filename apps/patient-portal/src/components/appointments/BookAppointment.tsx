'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@healthify/ui-kit';
import { 
  Calendar, Clock, MapPin, Phone, User, Video, MessageCircle
} from 'lucide-react';

const BookAppointment = () => {
  const router = useRouter();
  const [step, setStep] = React.useState(1);
  const [appointmentType, setAppointmentType] = React.useState('');
  const [consultationType, setConsultationType] = React.useState('');
  const [deliveryMethod, setDeliveryMethod] = React.useState('');
  const [isMobile, setIsMobile] = React.useState(false);
  
  // Check for mobile on client side
  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step submission
      router.push('/patient/appointments');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push('/patient/appointments');
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
                  variant={appointmentType === type ? "default" : "outline"}
                  className={`h-16 sm:h-20 flex-col ${appointmentType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setAppointmentType(type)}
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
                  variant={consultationType === type ? "default" : "outline"}
                  className={`h-16 sm:h-20 flex-col ${consultationType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setConsultationType(type)}
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {["Text", "Audio", "Video"].map((method) => (
                <Button
                  key={method}
                  variant={deliveryMethod === method ? "default" : "outline"}
                  className={`h-16 sm:h-20 flex-col ${deliveryMethod === method ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setDeliveryMethod(method)}
                >
                  {method === "Text" && <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  {method === "Audio" && <Phone className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  {method === "Video" && <Video className="h-4 w-4 sm:h-5 sm:w-5 mb-1 sm:mb-2" />}
                  <span className="text-xs sm:text-sm">{method}</span>
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-3 md:p-4">
          <Button variant="outline" onClick={handleBack} size={isMobile ? "sm" : "default"}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={
              (step === 1 && !appointmentType) || 
              (step === 2 && !consultationType) || 
              (step === 3 && !deliveryMethod)
            }
            size={isMobile ? "sm" : "default"}
          >
            {step === 3 ? "Confirm Booking" : "Next"}
          </Button>
        </CardFooter>
      </Card>

      {step === 3 && consultationType === "Scheduled" && (
        <Card className="max-w-full overflow-hidden">
          <CardHeader className="p-3 md:p-4">
            <CardTitle className="text-lg">Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-3 rounded min-h-32 md:min-h-52 flex items-center justify-center">
                <p className="text-gray-500">Calendar Placeholder</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                    <Button 
                      key={time} 
                      variant="outline" 
                      className="border-gray-300 hover:bg-health-highlight hover:text-health-primary text-xs sm:text-sm"
                      size={isMobile ? "sm" : "default"}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookAppointment; 
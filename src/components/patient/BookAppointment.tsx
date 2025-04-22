
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/packages/ui-kit";
import { 
  Calendar, Clock, MapPin, Phone, Users, Video, MessageCircle
} from "lucide-react";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [appointmentType, setAppointmentType] = React.useState("");
  const [consultationType, setConsultationType] = React.useState("");
  const [deliveryMethod, setDeliveryMethod] = React.useState("");

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final step submission
      navigate('/patient/appointments');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/patient/appointments');
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calendar className="h-6 w-6 text-health-primary" />
        Book an Appointment
      </h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-health-primary text-white mr-2">
              {step}
            </div>
            {step === 1 && "Select Provider Type"}
            {step === 2 && "Select Consultation Type"}
            {step === 3 && "Select Delivery Method"}
          </CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {step === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Doctor", "Therapist", "Physiotherapist"].map((type) => (
                <Button
                  key={type}
                  variant={appointmentType === type ? "default" : "outline"}
                  className={`h-24 flex-col ${appointmentType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setAppointmentType(type)}
                >
                  <Users className="h-6 w-6 mb-2" />
                  {type}
                </Button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Urgent", "Scheduled", "Home Visit"].map((type) => (
                <Button
                  key={type}
                  variant={consultationType === type ? "default" : "outline"}
                  className={`h-24 flex-col ${consultationType === type ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setConsultationType(type)}
                >
                  {type === "Urgent" && <Clock className="h-6 w-6 mb-2" />}
                  {type === "Scheduled" && <Calendar className="h-6 w-6 mb-2" />}
                  {type === "Home Visit" && <MapPin className="h-6 w-6 mb-2" />}
                  {type}
                </Button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["Text", "Audio", "Video"].map((method) => (
                <Button
                  key={method}
                  variant={deliveryMethod === method ? "default" : "outline"}
                  className={`h-24 flex-col ${deliveryMethod === method ? "bg-health-primary" : "border-gray-300"}`}
                  onClick={() => setDeliveryMethod(method)}
                >
                  {method === "Text" && <MessageCircle className="h-6 w-6 mb-2" />}
                  {method === "Audio" && <Phone className="h-6 w-6 mb-2" />}
                  {method === "Video" && <Video className="h-6 w-6 mb-2" />}
                  {method}
                </Button>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={
              (step === 1 && !appointmentType) || 
              (step === 2 && !consultationType) || 
              (step === 3 && !deliveryMethod)
            }
          >
            {step === 3 ? "Confirm Booking" : "Next"}
          </Button>
        </CardFooter>
      </Card>

      {step === 3 && consultationType === "Scheduled" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Select Date & Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded min-h-52 flex items-center justify-center">
                <p className="text-gray-500">Calendar Placeholder</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Available Time Slots</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                    <Button 
                      key={time} 
                      variant="outline" 
                      className="border-gray-300 hover:bg-health-highlight hover:text-health-primary"
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

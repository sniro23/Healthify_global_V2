
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import PatientPortalPage from "./pages/PatientPortalPage";
import DoctorPortalPage from "./pages/DoctorPortalPage";
import AdminPortalPage from "./pages/AdminPortalPage";
import NotFound from "./pages/NotFound";
import { NotificationProvider } from "./contexts/NotificationContext";

// Patient Portal Components
import Dashboard from "./components/patient/Dashboard";
import Appointments from "./components/patient/Appointments";
import HealthRecords from "./components/patient/HealthRecords";
import Messages from "./components/patient/Messages";
import Prescriptions from "./components/patient/Prescriptions";
import Profile from "./components/patient/Profile";
import AppointmentDetails from "./components/patient/AppointmentDetails";
import BookAppointment from "./components/patient/BookAppointment";
import LabReports from "./components/patient/LabReports";
import MedicationDetails from "./components/patient/MedicationDetails";
import VisitSummary from "./components/patient/VisitSummary";
import HelpCenter from "./components/patient/HelpCenter";
import ContactSupport from "./components/patient/ContactSupport";
import PaymentSettings from "./components/patient/PaymentSettings";
import NotificationScreen from "./components/doctor/NotificationScreen";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/patient" element={<PatientPortalPage />}>
              <Route index element={<Dashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="appointments/book" element={<BookAppointment />} />
              <Route path="appointments/:id" element={<AppointmentDetails />} />
              <Route path="records" element={<HealthRecords />} />
              <Route path="records/labs" element={<LabReports />} />
              <Route path="messages" element={<Messages />} />
              <Route path="prescriptions" element={<Prescriptions />} />
              <Route path="prescriptions/:id" element={<MedicationDetails />} />
              <Route path="visit-summary/:id" element={<VisitSummary />} />
              <Route path="profile" element={<Profile />} />
              <Route path="help" element={<HelpCenter />} />
              <Route path="contact" element={<ContactSupport />} />
              <Route path="payment-settings" element={<PaymentSettings />} />
            </Route>
            <Route path="/doctor" element={<DoctorPortalPage />}>
              <Route path="notifications" element={<NotificationScreen />} />
            </Route>
            <Route path="/admin" element={<AdminPortalPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

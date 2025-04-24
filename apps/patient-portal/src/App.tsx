import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PatientLayout from './components/layout/PatientLayout';
import Dashboard from './components/dashboard/Dashboard';
import Appointments from './components/appointments/Appointments';
import HealthRecords from './components/records/HealthRecords';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/patient" replace />} />
        
        <Route path="/patient" element={<PatientLayout><Dashboard /></PatientLayout>} />
        
        <Route path="/patient/appointments" element={<PatientLayout><Appointments /></PatientLayout>} />
        
        <Route path="/patient/records" element={<PatientLayout><HealthRecords /></PatientLayout>} />
        
        {/* Add more routes as they are implemented */}
        
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/patient" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 
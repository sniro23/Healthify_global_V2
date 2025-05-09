# Healthify UI Kit

A comprehensive UI component library for the Healthify Global Rebuild project, optimized for healthcare applications.

## Installation

This package is part of the Healthify monorepo and is installed automatically when running `pnpm install` at the root level.

## Building

To build the UI Kit, use one of the following commands:

```bash
# Standard build
pnpm build

# For systems with memory issues
pnpm build:optimized
```

## Usage

Import components from their respective paths:

```jsx
// Button component
import { Button } from '@healthify/ui-kit/ui';

// Authentication components
import { LoginForm } from '@healthify/ui-kit/auth';

// Authentication module (hooks, context)
import { useAuth, AuthProvider } from '@healthify/ui-kit/auth-module';

// Navigation components
import { BottomNav } from '@healthify/ui-kit/navigation';

// EHR components
import { PatientSummary } from '@healthify/ui-kit/ehr';
```

## Component Documentation

### Navigation Components

#### BottomNav

A mobile-friendly bottom navigation bar.

```jsx
import { BottomNav } from '@healthify/ui-kit/navigation';
import { Home, Calendar, User, FileText } from 'lucide-react';

// Example usage
const navItems = [
  { 
    label: 'Home', 
    href: '/dashboard', 
    icon: <Home size={24} />, 
    isActive: true 
  },
  { 
    label: 'Appointments', 
    href: '/appointments', 
    icon: <Calendar size={24} /> 
  },
  { 
    label: 'Records', 
    href: '/records', 
    icon: <FileText size={24} />,
    badge: 2 // Optional badge count
  },
  { 
    label: 'Profile', 
    href: '/profile', 
    icon: <User size={24} /> 
  }
];

function MyLayout() {
  return (
    <div>
      {/* Main content */}
      <BottomNav items={navItems} />
    </div>
  );
}
```

Props:
- `items`: Array of navigation items (required)
  - `label`: Display text for the item (required)
  - `href`: URL for the item link (required)
  - `icon`: React node for the icon (required)
  - `badge`: Number to display as a badge (optional)
  - `isActive`: Boolean to indicate active state (optional)
- `className`: Additional CSS classes (optional)

### Authentication Module

#### AuthProvider

Provides authentication context to your application.

```jsx
import { AuthProvider } from '@healthify/ui-kit/auth-module';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
```

#### useAuth Hook

Hook for accessing authentication state and methods.

```jsx
import { useAuth } from '@healthify/ui-kit/auth-module';

function ProfilePage() {
  const { user, isLoading, signOut, updateProfile } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}
```

Returns:
- `user`: Current user object or null
- `isLoading`: Boolean indicating loading state
- `signIn`: Function for signing in
- `signUp`: Function for signing up
- `signOut`: Function for signing out
- `updateProfile`: Function for updating user profile

### API Hooks

Healthify UI Kit provides a set of hooks for data fetching with built-in loading states, error handling, and mock data.

#### useMedicalRecords

Hook for fetching medical records with filtering capabilities.

```jsx
import { useMedicalRecords } from '@healthify/ui-kit/api';

function MedicalRecordsPage() {
  const { 
    records, 
    isLoading, 
    error, 
    refetch 
  } = useMedicalRecords({
    patientId: 'patient123',
    limit: 5
  });
  
  if (isLoading) return <div>Loading records...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Medical Records</h1>
      <ul>
        {records.map(record => (
          <li key={record.id}>
            <h3>{record.type}</h3>
            <p>Date: {record.date}</p>
            <p>Provider: {record.provider}</p>
            <p>{record.notes}</p>
          </li>
        ))}
      </ul>
      <button onClick={refetch}>Refresh</button>
    </div>
  );
}
```

Parameters:
- `patientId`: Filter records by patient ID (optional)
- `limit`: Maximum number of records to return (optional, default: 10)
- `initialData`: Preloaded data to use instead of making API call (optional)

Returns:
- `records`: Array of medical record objects
- `isLoading`: Boolean indicating loading state
- `error`: Error object or null
- `refetch`: Function to manually refetch data

#### useAppointments

Hook for fetching and managing appointments.

```jsx
import { useAppointments } from '@healthify/ui-kit/api';

function AppointmentsPage() {
  const { 
    appointments, 
    isLoading, 
    error, 
    cancelAppointment,
    rescheduleAppointment
  } = useAppointments({
    status: ['scheduled', 'confirmed'],
    startDate: new Date()
  });
  
  const handleCancel = async (id) => {
    const success = await cancelAppointment(id);
    if (success) {
      alert('Appointment cancelled successfully');
    }
  };
  
  return (
    <div>
      <h1>Appointments</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <ul>
          {appointments.map(appointment => (
            <li key={appointment.id}>
              <h3>{appointment.type}</h3>
              <p>Date: {appointment.date} at {appointment.time}</p>
              <p>Provider: {appointment.providerName}</p>
              <p>Status: {appointment.status}</p>
              <button onClick={() => handleCancel(appointment.id)}>
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

Parameters:
- `patientId`: Filter by patient ID (optional)
- `providerId`: Filter by provider ID (optional)
- `status`: Filter by appointment status (optional)
- `startDate`: Filter for appointments after this date (optional)
- `endDate`: Filter for appointments before this date (optional)
- `limit`: Maximum number of appointments to return (optional)
- `initialData`: Preloaded data to use (optional)

Returns:
- `appointments`: Array of appointment objects
- `isLoading`: Boolean indicating loading state
- `error`: Error object or null
- `refetch`: Function to manually refetch data
- `cancelAppointment`: Function to cancel an appointment
- `rescheduleAppointment`: Function to reschedule an appointment

#### useProfile

Hook for fetching and managing user profile data.

```jsx
import { useProfile } from '@healthify/ui-kit/api';

function ProfilePage() {
  const { 
    profile, 
    isLoading, 
    error, 
    updateProfile 
  } = useProfile();
  
  const handleUpdateProfile = async () => {
    const success = await updateProfile({
      name: 'Jane Doe',
      phone: '555-123-4567'
    });
    
    if (success) {
      alert('Profile updated successfully');
    }
  };
  
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!profile) return <div>No profile found</div>;
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone || 'Not provided'}</p>
      <button onClick={handleUpdateProfile}>
        Update Profile
      </button>
    </div>
  );
}
```

Returns:
- `profile`: User profile object or null
- `isLoading`: Boolean indicating loading state
- `error`: Error object or null
- `refetch`: Function to manually refetch data
- `updateProfile`: Function to update profile information

## Build Optimization

If you encounter memory issues during the build process, use:

```bash
pnpm build:optimized
```

This increases Node.js memory allocation and optimizes the build process.

## Known Issues

- TypeScript declaration file generation may consume significant memory
- Current workaround uses chunked generation and increased memory allocation 
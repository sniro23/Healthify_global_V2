# Healthify UI Requirements & Style Guide

## Current State Analysis

1. **Dashboard Page**:
   - Basic layout with mock data
   - Shows PatientSummary, MedicationList, ObservationList, and ConditionList components
   - No navigation elements
   - No consistent layout between pages

2. **Navigation**:
   - **Missing Implementation**: BottomNav and SideNav components exist in the UI kit, but neither is being used in the patient portal
   - The MainLayout component exists but isn't being applied to the dashboard

3. **Authentication**:
   - Working but doesn't integrate with the layout system

## Missing Components & Features

1. **Bottom Navigation Bar**:
   - This was supposed to be the primary navigation for the patient portal
   - Similar to mobile health apps with tab-based navigation
   - Already implemented in `packages/ui-kit/src/components/navigation/BottomNav.tsx` but not used

2. **Consistent Layout Structure**:
   - Need a wrapper layout that applies to all authenticated pages
   - Should include the bottom navigation and any other consistent UI elements

3. **Dashboard Widgets**:
   - Current widgets use mock data only
   - Need proper data fetching and state management
   - Need proper styling and interaction

4. **Theme/Styling Consistency**:
   - No consistent color scheme or component styling
   - Missing design tokens and theme variables

## Components to Build/Implement

1. **PatientPortalLayout**:
   - Should wrap all authenticated patient pages
   - Include the bottom navigation bar with proper icons
   - Add a header with user info and notifications

2. **BottomNavigation Implementation**:
   - Use the existing `BottomNav` component
   - Define navigation items: Dashboard, Appointments, Records, Profile, etc.
   - Add proper icons and active state handling

3. **Dashboard Card Components**:
   - UpcomingAppointments card
   - RecentVitals card (with visual charts)
   - Medication reminders
   - Quick action buttons

4. **Notifications Component**:
   - Show health reminders, appointment notifications
   - Badge indicator on the navigation

5. **User Profile Section**:
   - Avatar/photo
   - Basic info display
   - Quick settings access

## Implementation Plan

1. **Create PatientPortalLayout**:
   ```tsx
   // apps/patient-portal/src/components/layout/PatientPortalLayout.tsx
   'use client';
   
   import { BottomNav } from '@healthify/ui-kit/navigation';
   import { 
     Home, Calendar, PieChart, User, Bell 
   } from 'lucide-react';
   
   export function PatientPortalLayout({ children }) {
     const navItems = [
       { label: 'Home', href: '/dashboard', icon: <Home size={24} /> },
       { label: 'Appointments', href: '/appointments', icon: <Calendar size={24} /> },
       { label: 'Health', href: '/health', icon: <PieChart size={24} /> },
       { label: 'Profile', href: '/profile', icon: <User size={24} /> }
     ];
     
     return (
       <div className="pb-16"> {/* Add padding for bottom nav */}
         <header className="bg-white shadow-sm p-4">
           <div className="flex justify-between items-center">
             <h1 className="text-xl font-bold text-health-primary">Healthify</h1>
             <button className="p-2">
               <Bell size={24} />
             </button>
           </div>
         </header>
         
         <main className="container mx-auto px-4 py-6">
           {children}
         </main>
         
         <BottomNav items={navItems} />
       </div>
     );
   }
   ```

2. **Create Dashboard Cards**:
   - AppointmentCard for upcoming appointments
   - MedicationCard for medication schedule
   - VitalsCard for recent health data
   - ActionButtons for quick actions

3. **Apply Layout to Pages**:
   - Update dashboard page to use the new layout
   - Create or update other pages (appointments, profile, etc.)

## Style Guide

**Color Scheme:**  
- **Primary:** #9D5A8F (Healthify Purple)  
- **Secondary:** #10B981 (Emerald)  
- **Accent:** #F59E0B (Amber)  
- **Neutrals:**  
  - 50:  #f9fafb  
  - 100: #f3f4f6  
  - 200: #e5e7eb  
  - 300: #d1d5db  
  - 400: #9ca3af  
  - 500: #6b7280  
  - 600: #4b5563  
  - 700: #374151  
  - 800: #1f2937  
  - 900: #111827  

**Typography:**  
- **Headers:** Inter, Semi-Bold  
- **Body:** Inter, Regular  
- **Health Data Readings:** Monospace  

**Component Style:**  
- **Cards:**  
  - Background: White  
  - Shadow: `0 1px 3px rgba(0,0,0,0.1)`  
  - Corners: `0.5rem` radius  
- **Buttons:**  
  - Primary actions: background #9D5A8F, text-white, rounded-full  
  - Secondary actions: background #10B981, text-white  
  - Hover states: 10% darker shade  
- **Icons:**  
  - Line-style strokes, 24×24px, stroke-width 2  

**Layout:**  
- **Mobile-first responsive** breakpoints  
- **Bottom navigation** for core tabs (Home / Records / Chat / Profile)  
- **Card-based** arrangement for all list and dashboard screens 
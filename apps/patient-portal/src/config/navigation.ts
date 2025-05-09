import {
  HomeIcon,
  CalendarIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BellIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';

export const PATIENT_ROUTES = {
  DASHBOARD: '/dashboard',
  APPOINTMENTS: '/appointments',
  MEDICAL_RECORDS: '/records',
  MESSAGES: '/messages',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
} as const;

export const mainNavigation = [
  {
    label: 'Dashboard',
    href: PATIENT_ROUTES.DASHBOARD,
    icon: HomeIcon,
  },
  {
    label: 'Appointments',
    href: PATIENT_ROUTES.APPOINTMENTS,
    icon: CalendarIcon,
  },
  {
    label: 'Medical Records',
    href: PATIENT_ROUTES.MEDICAL_RECORDS,
    icon: DocumentTextIcon,
  },
  {
    label: 'Messages',
    href: PATIENT_ROUTES.MESSAGES,
    icon: ChatBubbleLeftRightIcon,
  },
  {
    label: 'Profile',
    href: PATIENT_ROUTES.PROFILE,
    icon: UserIcon,
  },
];

export const secondaryNavigation = [
  {
    label: 'Notifications',
    href: PATIENT_ROUTES.NOTIFICATIONS,
    icon: BellIcon,
  },
  {
    label: 'Settings',
    href: PATIENT_ROUTES.SETTINGS,
    icon: Cog6ToothIcon,
  },
]; 
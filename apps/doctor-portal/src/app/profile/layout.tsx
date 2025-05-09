import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doctor Profile | Healthify',
  description: 'Manage your doctor profile and credentials',
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
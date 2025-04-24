import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healthify Admin Portal',
  description: 'Manage users, plans, and system settings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
} 
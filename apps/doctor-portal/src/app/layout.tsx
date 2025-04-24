import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Healthify Doctor Portal',
  description: 'Manage your patients and appointments',
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
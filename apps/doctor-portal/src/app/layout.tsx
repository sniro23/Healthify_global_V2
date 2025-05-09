import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import DoctorNavigation from '@/components/common/DoctorNavigation';
import { Providers } from './Providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Healthify Doctor Portal',
  description: 'Healthcare management system for medical professionals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen">
            <DoctorNavigation />
            <main className="flex-1 overflow-auto">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
} 
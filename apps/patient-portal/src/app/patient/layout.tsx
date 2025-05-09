import React from 'react';

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800">Patient Portal</h1>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
} 
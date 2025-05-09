'use client';

import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import { CalendarIcon, DocumentTextIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-6">Patient Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Appointments Card */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 border border-gray-100">
            <div className="mb-4">
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 text-health-primary mr-2" />
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">No upcoming appointments</p>
              <Link 
                href="/appointments" 
                className="text-sm text-health-primary hover:underline font-medium flex items-center"
              >
                Manage appointments
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Medical Records Card */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 border border-gray-100">
            <div className="mb-4">
              <div className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 text-health-primary mr-2" />
                <h3 className="text-lg font-semibold">Medical Records</h3>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">View your latest records</p>
              <Link 
                href="/records" 
                className="text-sm text-health-primary hover:underline font-medium flex items-center"
              >
                Access records
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Messages Card */}
          <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-5 border border-gray-100">
            <div className="mb-4">
              <div className="flex items-center">
                <ChatBubbleLeftRightIcon className="h-6 w-6 text-health-primary mr-2" />
                <h3 className="text-lg font-semibold">Messages</h3>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-4">No new messages</p>
              <Link 
                href="/messages" 
                className="text-sm text-health-primary hover:underline font-medium flex items-center"
              >
                View messages
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-sm rounded-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-500">No recent activity to display</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 
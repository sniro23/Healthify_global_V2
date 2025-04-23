
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import App from '../App';
import '../index.css';

// Create a client
const queryClient = new QueryClient();

export default function NextApp({ Component, pageProps }: AppProps) {
  // We're actually not using Next.js routing, so we just render our main App component
  return <App />;
}

'use client';

import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppThemeProvider } from '@/lib/theme/ThemeProvider';
import React from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      retry: 1,
    },
  },
});

export function Providers({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: 'ltr' | 'rtl';
}) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider direction={direction}>
          {children}
        </AppThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}

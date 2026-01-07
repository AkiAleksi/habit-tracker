'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { HabitsProvider } from '@/contexts/HabitsContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <HabitsProvider>
        {children}
      </HabitsProvider>
    </AuthProvider>
  );
}

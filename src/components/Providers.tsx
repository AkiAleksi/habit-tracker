'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { HabitsProvider } from '@/contexts/HabitsContext';
import { GamificationProvider } from '@/contexts/GamificationContext';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <HabitsProvider>
        <GamificationProvider>
          {children}
        </GamificationProvider>
      </HabitsProvider>
    </AuthProvider>
  );
}

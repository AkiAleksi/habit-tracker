'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { useHabits, Habit } from '@/hooks/useHabits';

// Re-export Habit type for convenience
export type { Habit };

interface HabitsContextValue {
  habits: Habit[];
  isLoaded: boolean;
  isSynced: boolean;
  addHabit: (name: string) => Promise<void>;
  toggleHabit: (habitId: string) => Promise<void>;
  editHabit: (habitId: string, newName: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
  isCompletedToday: (habitId: string) => boolean;
  getStreak: (habitId: string) => number;
  getTodayProgress: () => { completed: number; total: number; percentage: number };
}

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function useHabitsContext() {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabitsContext must be used within a HabitsProvider');
  }
  return context;
}

interface HabitsProviderProps {
  children: ReactNode;
}

export function HabitsProvider({ children }: HabitsProviderProps) {
  const { user, loading: authLoading } = useAuth();
  const habitsData = useHabits(user?.id ?? null);

  // Don't render children until auth is ready
  if (authLoading) {
    return null;
  }

  return (
    <HabitsContext.Provider value={habitsData}>
      {children}
    </HabitsContext.Provider>
  );
}

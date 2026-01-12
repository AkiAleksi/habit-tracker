'use client';

import { createContext, useContext, ReactNode, useCallback, useEffect, useRef } from 'react';
import { useHabitsContext } from './HabitsContext';
import { useGamification } from '@/hooks/useGamification';
import { LevelUpModal, AchievementUnlockModal } from '@/components/gamification';
import { Level, Achievement, UserStats } from '@/lib/gamification';

interface GamificationContextValue {
  totalXP: number;
  currentLevel: Level;
  nextLevel: Level | null;
  xpProgress: { current: number; needed: number; percentage: number };
  stats: UserStats;
  unlockedAchievements: Achievement[];
  lockedAchievements: Achievement[];
  allAchievements: Achievement[];
  awardCompletionXP: (streak: number) => void;
  awardNewHabitXP: () => void;
}

const GamificationContext = createContext<GamificationContextValue | null>(null);

export function useGamificationContext() {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamificationContext must be used within a GamificationProvider');
  }
  return context;
}

interface GamificationProviderProps {
  children: ReactNode;
}

export function GamificationProvider({ children }: GamificationProviderProps) {
  const { habits, getStreak, isCompletedToday, getTodayProgress, isLoaded } = useHabitsContext();

  const gamification = useGamification({
    habits,
    getStreak,
    isCompletedToday,
    getTodayProgress,
  });

  const value: GamificationContextValue = {
    totalXP: gamification.totalXP,
    currentLevel: gamification.currentLevel,
    nextLevel: gamification.nextLevel,
    xpProgress: gamification.xpProgress,
    stats: gamification.stats,
    unlockedAchievements: gamification.unlockedAchievements,
    lockedAchievements: gamification.lockedAchievements,
    allAchievements: gamification.allAchievements,
    awardCompletionXP: gamification.awardCompletionXP,
    awardNewHabitXP: gamification.awardNewHabitXP,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}

      {/* Level Up Modal */}
      <LevelUpModal
        isOpen={gamification.showLevelUp}
        level={gamification.currentLevel}
        onClose={gamification.dismissLevelUp}
      />

      {/* Achievement Unlock Modal */}
      <AchievementUnlockModal
        achievement={gamification.newAchievement}
        onClose={gamification.dismissAchievement}
      />
    </GamificationContext.Provider>
  );
}

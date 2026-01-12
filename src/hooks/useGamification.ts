'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {
  LEVELS,
  ACHIEVEMENTS,
  XP_REWARDS,
  getLevelFromXP,
  getNextLevel,
  getXPProgress,
  checkAchievementUnlocked,
  Achievement,
  Level,
  UserStats,
} from '@/lib/gamification';

interface GamificationData {
  totalXP: number;
  unlockedAchievements: string[];
  lastLevelUp: number;
  perfectDays: number;
  totalCompletions: number;
  longestStreak: number;
}

const INITIAL_DATA: GamificationData = {
  totalXP: 0,
  unlockedAchievements: [],
  lastLevelUp: 1,
  perfectDays: 0,
  totalCompletions: 0,
  longestStreak: 0,
};

interface UseGamificationProps {
  habits: { id: string; name: string }[];
  getStreak: (habitId: string) => number;
  isCompletedToday: (habitId: string) => boolean;
  getTodayProgress: () => { completed: number; total: number; percentage: number };
}

export function useGamification({
  habits,
  getStreak,
  isCompletedToday,
  getTodayProgress,
}: UseGamificationProps) {
  const [data, setData] = useLocalStorage<GamificationData>('devhabit-gamification', INITIAL_DATA);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  // Calculate current stats
  const stats: UserStats = useMemo(() => {
    const longestStreak = habits.reduce((max, habit) => {
      const streak = getStreak(habit.id);
      return streak > max ? streak : max;
    }, 0);

    const currentStreak = longestStreak;

    return {
      totalXP: data.totalXP,
      totalCompletions: data.totalCompletions,
      currentStreak,
      longestStreak: Math.max(longestStreak, data.longestStreak),
      perfectDays: data.perfectDays,
      habitsCreated: habits.length,
    };
  }, [habits, getStreak, data]);

  // Current level
  const currentLevel = useMemo(() => getLevelFromXP(data.totalXP), [data.totalXP]);
  const nextLevel = useMemo(() => getNextLevel(currentLevel.level), [currentLevel]);
  const xpProgress = useMemo(() => getXPProgress(data.totalXP), [data.totalXP]);

  // Get unlocked achievements
  const unlockedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(a => data.unlockedAchievements.includes(a.id));
  }, [data.unlockedAchievements]);

  // Get locked achievements
  const lockedAchievements = useMemo(() => {
    return ACHIEVEMENTS.filter(a => !data.unlockedAchievements.includes(a.id));
  }, [data.unlockedAchievements]);

  // Check for new achievements
  const checkAchievements = useCallback(() => {
    const newlyUnlocked: Achievement[] = [];

    ACHIEVEMENTS.forEach(achievement => {
      if (data.unlockedAchievements.includes(achievement.id)) return;

      if (checkAchievementUnlocked(achievement, stats, currentLevel.level)) {
        newlyUnlocked.push(achievement);
      }
    });

    if (newlyUnlocked.length > 0) {
      const totalXPGained = newlyUnlocked.reduce((sum, a) => sum + a.xpReward, 0);

      setData(prev => ({
        ...prev,
        totalXP: prev.totalXP + totalXPGained,
        unlockedAchievements: [...prev.unlockedAchievements, ...newlyUnlocked.map(a => a.id)],
        longestStreak: Math.max(prev.longestStreak, stats.longestStreak),
      }));

      // Show the first new achievement
      setNewAchievement(newlyUnlocked[0]);
      setXpGained(totalXPGained);
    }
  }, [data.unlockedAchievements, stats, currentLevel.level, setData]);

  // Award XP for habit completion
  const awardCompletionXP = useCallback((streak: number) => {
    let xp = XP_REWARDS.HABIT_COMPLETION;

    // Streak bonuses
    if (streak >= 30) xp += XP_REWARDS.STREAK_BONUS_30;
    else if (streak >= 14) xp += XP_REWARDS.STREAK_BONUS_14;
    else if (streak >= 7) xp += XP_REWARDS.STREAK_BONUS_7;
    else if (streak >= 3) xp += XP_REWARDS.STREAK_BONUS_3;

    setData(prev => {
      const newXP = prev.totalXP + xp;
      const newTotalCompletions = prev.totalCompletions + 1;
      const oldLevel = getLevelFromXP(prev.totalXP);
      const newLevel = getLevelFromXP(newXP);

      // Check for level up
      if (newLevel.level > oldLevel.level) {
        setTimeout(() => setShowLevelUp(true), 500);
      }

      return {
        ...prev,
        totalXP: newXP,
        totalCompletions: newTotalCompletions,
      };
    });

    setXpGained(xp);
  }, [setData]);

  // Award XP for perfect day
  const checkPerfectDay = useCallback(() => {
    const progress = getTodayProgress();
    if (progress.percentage === 100 && progress.total > 0) {
      setData(prev => ({
        ...prev,
        perfectDays: prev.perfectDays + 1,
        totalXP: prev.totalXP + XP_REWARDS.PERFECT_DAY,
      }));
    }
  }, [getTodayProgress, setData]);

  // Award XP for new habit
  const awardNewHabitXP = useCallback(() => {
    setData(prev => ({
      ...prev,
      totalXP: prev.totalXP + XP_REWARDS.NEW_HABIT,
    }));
    setXpGained(XP_REWARDS.NEW_HABIT);
  }, [setData]);

  // Check achievements when stats change
  useEffect(() => {
    if (habits.length > 0) {
      checkAchievements();
    }
  }, [stats.totalCompletions, stats.longestStreak, stats.habitsCreated, currentLevel.level]);

  // Dismiss achievement notification
  const dismissAchievement = useCallback(() => {
    setNewAchievement(null);
  }, []);

  // Dismiss level up notification
  const dismissLevelUp = useCallback(() => {
    setShowLevelUp(false);
  }, []);

  return {
    // Stats
    totalXP: data.totalXP,
    currentLevel,
    nextLevel,
    xpProgress,
    stats,

    // Achievements
    unlockedAchievements,
    lockedAchievements,
    allAchievements: ACHIEVEMENTS,

    // Notifications
    newAchievement,
    showLevelUp,
    xpGained,

    // Actions
    awardCompletionXP,
    awardNewHabitXP,
    checkPerfectDay,
    dismissAchievement,
    dismissLevelUp,
  };
}

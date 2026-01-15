'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import { useLocalStorage } from './useLocalStorage';
import { useFirestoreSync, FirestoreHabit } from './useFirestoreSync';
import { getTodayKey } from '@/utils/date';
import { calculateStreak } from '@/utils/streak';

export interface Habit {
  id: string;
  name: string;
  createdAt: string;
  order: number;
}

interface HabitLogs {
  [habitId: string]: {
    [date: string]: boolean;
  };
}

interface StoredData {
  habits: Habit[];
  logs: HabitLogs;
}

const STORAGE_KEY = 'habit-tracker-data';

const INITIAL_DATA: StoredData = {
  habits: [],
  logs: {},
};

export function useHabits(userId: string | null = null) {
  const [localData, setLocalData] = useLocalStorage<StoredData>(STORAGE_KEY, INITIAL_DATA);
  const [isLoaded, setIsLoaded] = useState(false);
  const hasMigrated = useRef(false);

  const {
    habits: firestoreHabits,
    logs: firestoreLogs,
    isLoading: firestoreLoading,
    isSynced,
    saveHabit: saveToFirestore,
    deleteHabit: deleteFromFirestore,
    updateHabitLog: updateFirestoreLog,
    migrateFromLocalStorage,
  } = useFirestoreSync(userId);

  // Use Firestore data when synced, otherwise local
  const useFirestore = userId && isSynced;

  // Convert Firestore habits to local format
  const habits: Habit[] = useFirestore
    ? firestoreHabits.map((h) => ({
        id: h.id,
        name: h.name,
        createdAt: h.createdAt instanceof Timestamp
          ? h.createdAt.toDate().toISOString()
          : h.createdAt,
        order: h.order,
      }))
    : localData.habits;

  // Convert Firestore logs to local format
  const logs: HabitLogs = useFirestore
    ? Object.entries(firestoreLogs).reduce((acc, [habitId, habitLog]) => {
        acc[habitId] = {};
        Object.entries(habitLog).forEach(([date, log]) => {
          acc[habitId][date] = log.completed;
        });
        return acc;
      }, {} as HabitLogs)
    : localData.logs;

  const today = getTodayKey();

  // Mark as loaded after first render or when Firestore is ready
  useEffect(() => {
    if (!userId) {
      setIsLoaded(true);
    } else if (isSynced) {
      setIsLoaded(true);
    }
  }, [userId, isSynced]);

  // Migrate local data to Firestore when user first syncs
  useEffect(() => {
    if (userId && isSynced && !hasMigrated.current && localData.habits.length > 0 && firestoreHabits.length === 0) {
      hasMigrated.current = true;
      const firestoreFormatHabits: FirestoreHabit[] = localData.habits.map((h) => ({
        id: h.id,
        name: h.name,
        createdAt: h.createdAt,
        order: h.order,
      }));
      migrateFromLocalStorage(firestoreFormatHabits, localData.logs);
    }
  }, [userId, isSynced, localData, firestoreHabits.length, migrateFromLocalStorage]);

  // Add a new habit
  const addHabit = useCallback(
    async (name: string) => {
      const newHabit: Habit = {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date().toISOString(),
        order: habits.length,
      };

      if (useFirestore) {
        await saveToFirestore({
          id: newHabit.id,
          name: newHabit.name,
          createdAt: newHabit.createdAt,
          order: newHabit.order,
        });
      } else {
        setLocalData((prev) => ({
          ...prev,
          habits: [...prev.habits, newHabit],
        }));
      }
    },
    [habits.length, useFirestore, saveToFirestore, setLocalData]
  );

  // Toggle habit completion for today
  const toggleHabit = useCallback(
    async (habitId: string) => {
      const isCurrentlyCompleted = logs[habitId]?.[today] || false;

      if (useFirestore) {
        await updateFirestoreLog(habitId, today, !isCurrentlyCompleted);
      } else {
        setLocalData((prev) => {
          const habitLogs = prev.logs[habitId] || {};
          return {
            ...prev,
            logs: {
              ...prev.logs,
              [habitId]: {
                ...habitLogs,
                [today]: !isCurrentlyCompleted,
              },
            },
          };
        });
      }
    },
    [today, logs, useFirestore, updateFirestoreLog, setLocalData]
  );

  // Edit habit name
  const editHabit = useCallback(
    async (habitId: string, newName: string) => {
      if (useFirestore) {
        const habit = firestoreHabits.find((h) => h.id === habitId);
        if (habit) {
          const habitLogs = firestoreLogs[habitId];
          await saveToFirestore(
            { ...habit, name: newName },
            habitLogs
          );
        }
      } else {
        setLocalData((prev) => ({
          ...prev,
          habits: prev.habits.map((h) =>
            h.id === habitId ? { ...h, name: newName } : h
          ),
        }));
      }
    },
    [useFirestore, firestoreHabits, firestoreLogs, saveToFirestore, setLocalData]
  );

  // Delete habit
  const deleteHabit = useCallback(
    async (habitId: string) => {
      if (useFirestore) {
        await deleteFromFirestore(habitId);
      } else {
        setLocalData((prev) => {
          const newLogs = { ...prev.logs };
          delete newLogs[habitId];

          return {
            ...prev,
            habits: prev.habits.filter((h) => h.id !== habitId),
            logs: newLogs,
          };
        });
      }
    },
    [useFirestore, deleteFromFirestore, setLocalData]
  );

  // Check if habit is completed today
  const isCompletedToday = useCallback(
    (habitId: string): boolean => {
      return logs[habitId]?.[today] || false;
    },
    [logs, today]
  );

  // Get streak for a habit
  const getStreak = useCallback(
    (habitId: string): number => {
      const habitLogs = logs[habitId] || {};
      return calculateStreak(habitLogs);
    },
    [logs]
  );

  // Get today's progress
  const getTodayProgress = useCallback(() => {
    const total = habits.length;
    const completed = habits.filter((h) => isCompletedToday(h.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completed, total, percentage };
  }, [habits, isCompletedToday]);

  return {
    habits,
    isLoaded: isLoaded && !firestoreLoading,
    isSynced,
    addHabit,
    toggleHabit,
    editHabit,
    deleteHabit,
    isCompletedToday,
    getStreak,
    getTodayProgress,
  };
}

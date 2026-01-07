'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import { getFirebaseDb } from '@/lib/firebase';

export interface FirestoreHabit {
  id: string;
  name: string;
  createdAt: Timestamp | string;
  order: number;
}

export interface FirestoreHabitLog {
  [date: string]: {
    completed: boolean;
    completedAt?: Timestamp;
  };
}

interface FirestoreData {
  habits: FirestoreHabit[];
  logs: { [habitId: string]: FirestoreHabitLog };
}

export function useFirestoreSync(userId: string | null) {
  const [data, setData] = useState<FirestoreData>({ habits: [], logs: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [isSynced, setIsSynced] = useState(false);

  // Load from Firestore on mount
  useEffect(() => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    const db = getFirebaseDb();
    if (!db) {
      setIsLoading(false);
      return;
    }

    const habitsRef = collection(db, 'users', userId, 'habits');

    const unsubscribe = onSnapshot(
      habitsRef,
      (snapshot) => {
        const habits: FirestoreHabit[] = [];
        const logs: { [habitId: string]: FirestoreHabitLog } = {};

        snapshot.docs.forEach((doc) => {
          const docData = doc.data();
          habits.push({
            id: doc.id,
            name: docData.name,
            createdAt: docData.createdAt,
            order: docData.order ?? 0,
          });
          if (docData.logs) {
            logs[doc.id] = docData.logs;
          }
        });

        // Sort by order
        habits.sort((a, b) => a.order - b.order);

        setData({ habits, logs });
        setIsLoading(false);
        setIsSynced(true);
      },
      (error) => {
        console.error('Firestore sync error:', error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const saveHabit = useCallback(
    async (habit: FirestoreHabit, logs?: FirestoreHabitLog) => {
      if (!userId) return;

      const db = getFirebaseDb();
      if (!db) return;

      const habitRef = doc(db, 'users', userId, 'habits', habit.id);
      await setDoc(habitRef, {
        name: habit.name,
        createdAt: habit.createdAt,
        order: habit.order,
        ...(logs && { logs }),
      });
    },
    [userId]
  );

  const deleteHabit = useCallback(
    async (habitId: string) => {
      if (!userId) return;

      const db = getFirebaseDb();
      if (!db) return;

      const habitRef = doc(db, 'users', userId, 'habits', habitId);
      await deleteDoc(habitRef);
    },
    [userId]
  );

  const updateHabitLog = useCallback(
    async (habitId: string, date: string, completed: boolean) => {
      if (!userId) return;

      const db = getFirebaseDb();
      if (!db) return;

      const habitRef = doc(db, 'users', userId, 'habits', habitId);
      const currentHabit = data.habits.find((h) => h.id === habitId);
      const currentLogs = data.logs[habitId] || {};

      if (!currentHabit) return;

      await setDoc(habitRef, {
        name: currentHabit.name,
        createdAt: currentHabit.createdAt,
        order: currentHabit.order,
        logs: {
          ...currentLogs,
          [date]: {
            completed,
            ...(completed && { completedAt: Timestamp.now() }),
          },
        },
      });
    },
    [userId, data.habits, data.logs]
  );

  const migrateFromLocalStorage = useCallback(
    async (localHabits: FirestoreHabit[], localLogs: { [habitId: string]: { [date: string]: boolean } }) => {
      if (!userId) return;

      const db = getFirebaseDb();
      if (!db) return;

      const batch = writeBatch(db);

      localHabits.forEach((habit) => {
        const habitRef = doc(db, 'users', userId, 'habits', habit.id);
        const habitLogs: FirestoreHabitLog = {};

        if (localLogs[habit.id]) {
          Object.entries(localLogs[habit.id]).forEach(([date, completed]) => {
            if (completed) {
              habitLogs[date] = { completed: true };
            }
          });
        }

        batch.set(habitRef, {
          name: habit.name,
          createdAt: habit.createdAt,
          order: habit.order,
          logs: habitLogs,
        });
      });

      await batch.commit();
    },
    [userId]
  );

  return {
    habits: data.habits,
    logs: data.logs,
    isLoading,
    isSynced,
    saveHabit,
    deleteHabit,
    updateHabitLog,
    migrateFromLocalStorage,
  };
}

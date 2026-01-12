'use client';

import { useHabitsContext } from '@/contexts/HabitsContext';

export function StreakBanner() {
  const { habits, getStreak, isLoaded } = useHabitsContext();

  // Get the best streak across all habits
  const bestStreak = habits.reduce((max, habit) => {
    const streak = getStreak(habit.id);
    return streak > max ? streak : max;
  }, 0);

  // Don't show if no significant streak or still loading
  if (!isLoaded || bestStreak < 3) {
    return null;
  }

  const getMessage = () => {
    if (bestStreak >= 30) return 'Uskomaton sitoutuminen!';
    if (bestStreak >= 14) return 'Kaksi viikkoa vahvaa!';
    if (bestStreak >= 7) return 'Viikon putki kasassa!';
    return 'Hyvä alku!';
  };

  return (
    <div
      className={`flex items-center justify-between rounded-xl p-4 ${bestStreak >= 7 ? 'streak-glow' : ''}`}
      style={{
        backgroundColor: bestStreak >= 7 ? 'var(--color-streak-bg)' : 'var(--color-surface)',
        border: `1px solid ${bestStreak >= 7 ? 'var(--color-streak)' : 'var(--color-border)'}`,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg text-xl"
          style={{
            backgroundColor: bestStreak >= 7 ? 'rgba(249, 115, 22, 0.2)' : 'var(--color-surface-hover)',
          }}
        >
          🔥
        </div>
        <div>
          <p
            className="text-sm font-medium"
            style={{ color: bestStreak >= 7 ? 'var(--color-streak)' : 'var(--color-text)' }}
          >
            {getMessage()}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Paras streak
          </p>
        </div>
      </div>

      <div
        className="flex items-center gap-1 rounded-lg px-3 py-2"
        style={{
          backgroundColor: bestStreak >= 7 ? 'rgba(249, 115, 22, 0.2)' : 'var(--color-surface-hover)',
        }}
      >
        <span
          className="font-mono text-2xl font-bold"
          style={{ color: bestStreak >= 7 ? 'var(--color-streak)' : 'var(--color-text)' }}
        >
          {bestStreak}
        </span>
        <span
          className="text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          päivää
        </span>
      </div>
    </div>
  );
}

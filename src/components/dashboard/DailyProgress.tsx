'use client';

import { useState, useEffect } from 'react';
import { useHabitsContext } from '@/contexts/HabitsContext';
import { getProgressMessage } from '@/lib/messages';

export function DailyProgress() {
  const { getTodayProgress, isLoaded } = useHabitsContext();
  const { completed, total, percentage } = getTodayProgress();
  const [message, setMessage] = useState('');

  // Set message on client side to avoid hydration mismatch
  useEffect(() => {
    setMessage(getProgressMessage(completed, total));
  }, [completed, total]);

  // Show loading skeleton while data loads
  if (!isLoaded) {
    return (
      <div
        className="rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div
            className="h-5 w-24 animate-pulse rounded"
            style={{ backgroundColor: 'var(--color-background)' }}
          />
          <div
            className="h-4 w-16 animate-pulse rounded"
            style={{ backgroundColor: 'var(--color-background)' }}
          />
        </div>
        <div
          className="h-3 w-full animate-pulse rounded-full"
          style={{ backgroundColor: 'var(--color-background)' }}
        />
      </div>
    );
  }

  // Don't show if no habits exist
  if (total === 0) {
    return null;
  }

  return (
    <div
      className="rounded-xl p-4"
      style={{ backgroundColor: 'var(--color-surface)' }}
    >
      {/* Header with progress text */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Tänään
        </span>
        <span
          className="text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {completed}/{total} tehty
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-3 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? 'var(--color-success)' : 'var(--color-primary)',
          }}
        />
      </div>

      {/* Encouraging message */}
      {message && (
        <p
          className="mt-3 text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

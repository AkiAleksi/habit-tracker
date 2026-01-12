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

  const isComplete = percentage === 100;

  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Header with progress text */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-sm font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          Päivän edistyminen
        </span>
        <span
          className="font-mono text-sm font-semibold"
          style={{ color: isComplete ? 'var(--color-success)' : 'var(--color-text)' }}
        >
          {completed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--color-border)' }}
      >
        <div
          className="progress-bar h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: isComplete ? 'var(--color-success)' : 'var(--color-primary)',
            boxShadow: isComplete ? '0 0 12px rgba(35, 134, 54, 0.5)' : 'none',
          }}
        />
      </div>

      {/* Encouraging message */}
      {message && (
        <p
          className="mt-3 text-sm"
          style={{ color: isComplete ? 'var(--color-success)' : 'var(--color-text-muted)' }}
        >
          {isComplete ? '🎉 ' : ''}{message}
        </p>
      )}
    </div>
  );
}

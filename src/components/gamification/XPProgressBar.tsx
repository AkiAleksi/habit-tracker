'use client';

import { Level } from '@/lib/gamification';

interface XPProgressBarProps {
  currentXP: number;
  xpProgress: {
    current: number;
    needed: number;
    percentage: number;
  };
  currentLevel: Level;
  nextLevel: Level | null;
  xpGained?: number;
}

export function XPProgressBar({
  currentXP,
  xpProgress,
  currentLevel,
  nextLevel,
  xpGained,
}: XPProgressBarProps) {
  return (
    <div
      className="rounded-xl p-4"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Header with level info */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentLevel.icon}</span>
          <div>
            <span
              className="font-semibold text-sm"
              style={{ color: 'var(--color-text)' }}
            >
              {currentLevel.title}
            </span>
            <span
              className="block font-mono text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Taso {currentLevel.level}
            </span>
          </div>
        </div>

        <div className="text-right relative">
          <span
            className="font-mono text-lg font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {currentXP.toLocaleString()} XP
          </span>
          {xpGained && xpGained > 0 && (
            <span
              className="absolute -top-4 right-0 xp-popup font-mono text-sm font-bold"
              style={{ color: 'var(--color-success)' }}
            >
              +{xpGained}
            </span>
          )}
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="relative">
        <div
          className="h-3 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--color-surface-hover)' }}
        >
          <div
            className="xp-bar h-full rounded-full transition-all duration-500"
            style={{ width: `${xpProgress.percentage}%` }}
          />
        </div>

        {/* Progress text */}
        {nextLevel && (
          <div className="flex justify-between mt-2">
            <span
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {xpProgress.current.toLocaleString()} / {xpProgress.needed.toLocaleString()} XP
            </span>
            <span
              className="text-xs flex items-center gap-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Seuraava: {nextLevel.icon} {nextLevel.title}
            </span>
          </div>
        )}

        {!nextLevel && (
          <p
            className="text-center mt-2 text-sm font-medium"
            style={{ color: 'var(--color-streak)' }}
          >
            Maksimitaso saavutettu!
          </p>
        )}
      </div>
    </div>
  );
}

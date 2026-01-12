'use client';

import { Level, UserStats } from '@/lib/gamification';

interface PlayerStatsProps {
  level: Level;
  stats: UserStats;
  xpProgress: {
    current: number;
    needed: number;
    percentage: number;
  };
  nextLevel: Level | null;
  unlockedCount: number;
  totalAchievements: number;
}

export function PlayerStats({
  level,
  stats,
  xpProgress,
  nextLevel,
  unlockedCount,
  totalAchievements,
}: PlayerStatsProps) {
  const statItems = [
    {
      label: 'Streak',
      value: stats.longestStreak,
      icon: '🔥',
      color: 'var(--color-streak)',
    },
    {
      label: 'Suoritukset',
      value: stats.totalCompletions,
      icon: '✅',
      color: 'var(--color-success)',
    },
    {
      label: 'Täydelliset päivät',
      value: stats.perfectDays,
      icon: '⭐',
      color: '#f59e0b',
    },
    {
      label: 'Saavutukset',
      value: `${unlockedCount}/${totalAchievements}`,
      icon: '🏆',
      color: '#a855f7',
    },
  ];

  return (
    <div
      className="rounded-xl p-4 hover-lift"
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Level and XP header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl level-badge"
            style={{
              border: '2px solid var(--color-primary)',
              boxShadow: '0 0 15px rgba(35, 134, 54, 0.2)',
            }}
          >
            {level.icon}
          </div>
          <div>
            <h3
              className="font-bold text-lg"
              style={{ color: 'var(--color-text)' }}
            >
              {level.title}
            </h3>
            <p
              className="font-mono text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Taso {level.level}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p
            className="font-mono text-xl font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {stats.totalXP.toLocaleString()}
          </p>
          <p
            className="text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            XP
          </p>
        </div>
      </div>

      {/* XP Progress bar */}
      <div className="mb-4">
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--color-surface-hover)' }}
        >
          <div
            className="xp-bar h-full rounded-full transition-all duration-500"
            style={{ width: `${xpProgress.percentage}%` }}
          />
        </div>
        {nextLevel && (
          <div className="flex justify-between mt-1">
            <span
              className="font-mono text-[10px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {xpProgress.current} / {xpProgress.needed} XP
            </span>
            <span
              className="text-[10px] flex items-center gap-1"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {nextLevel.icon} {nextLevel.title}
            </span>
          </div>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        {statItems.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg p-3 text-center"
            style={{ backgroundColor: 'var(--color-surface-hover)' }}
          >
            <span className="text-xl">{stat.icon}</span>
            <p
              className="font-mono text-lg font-bold mt-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p
              className="text-[10px]"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

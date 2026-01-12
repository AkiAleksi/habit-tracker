'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { useGamificationContext } from '@/contexts/GamificationContext';
import { AchievementCard, LevelBadge } from '@/components/gamification';
import { LEVELS } from '@/lib/gamification';

export default function StatsPage() {
  const {
    totalXP,
    currentLevel,
    nextLevel,
    xpProgress,
    stats,
    unlockedAchievements,
    lockedAchievements,
    allAchievements,
  } = useGamificationContext();

  const statItems = [
    { label: 'Kokonais-XP', value: totalXP.toLocaleString(), icon: '⭐' },
    { label: 'Pisin streak', value: stats.longestStreak, icon: '🔥' },
    { label: 'Suoritukset', value: stats.totalCompletions, icon: '✅' },
    { label: 'Täydelliset päivät', value: stats.perfectDays, icon: '🌟' },
    { label: 'Tavat luotu', value: stats.habitsCreated, icon: '📝' },
  ];

  return (
    <main
      className="min-h-screen py-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Container>
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-surface-hover)]"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1
            className="text-xl font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            Tilastot
          </h1>
        </div>

        {/* Level Card */}
        <div
          className="rounded-xl p-6 mb-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-4 mb-4">
            <LevelBadge level={currentLevel} size="lg" showTitle={false} />
            <div className="flex-1">
              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                {currentLevel.title}
              </h2>
              <p
                className="font-mono text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Taso {currentLevel.level} - {totalXP.toLocaleString()} XP
              </p>
            </div>
          </div>

          {/* XP Progress */}
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
          </div>
        </div>

        {/* Stats Grid */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            Statistiikka
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg p-3 text-center"
                style={{ backgroundColor: 'var(--color-surface-hover)' }}
              >
                <span className="text-xl">{stat.icon}</span>
                <p
                  className="font-mono text-lg font-bold mt-1"
                  style={{ color: 'var(--color-primary)' }}
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

        {/* Level Progression */}
        <div
          className="rounded-xl p-4 mb-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            Tasoeteneminen
          </h3>
          <div className="space-y-2">
            {LEVELS.map((level) => {
              const isCurrentLevel = level.level === currentLevel.level;
              const isUnlocked = level.level <= currentLevel.level;

              return (
                <div
                  key={level.level}
                  className="flex items-center gap-3 rounded-lg p-2"
                  style={{
                    backgroundColor: isCurrentLevel
                      ? 'var(--color-primary-bg)'
                      : 'transparent',
                    opacity: isUnlocked ? 1 : 0.4,
                  }}
                >
                  <span className="text-lg">{level.icon}</span>
                  <div className="flex-1">
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isCurrentLevel
                          ? 'var(--color-primary)'
                          : 'var(--color-text)',
                      }}
                    >
                      {level.title}
                    </span>
                  </div>
                  <span
                    className="font-mono text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {level.minXP.toLocaleString()} XP
                  </span>
                  {isUnlocked && (
                    <span className="text-sm">
                      {isCurrentLevel ? '👈' : '✓'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div
          className="rounded-xl p-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3
              className="font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              Saavutukset
            </h3>
            <span
              className="font-mono text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {unlockedAchievements.length}/{allAchievements.length}
            </span>
          </div>

          {/* Unlocked achievements */}
          {unlockedAchievements.length > 0 && (
            <div className="mb-4">
              <p
                className="text-xs mb-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Avatut
              </p>
              <div className="grid gap-3">
                {unlockedAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={true}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Locked achievements */}
          {lockedAchievements.length > 0 && (
            <div>
              <p
                className="text-xs mb-2"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Lukitut
              </p>
              <div className="grid gap-3">
                {lockedAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    unlocked={false}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

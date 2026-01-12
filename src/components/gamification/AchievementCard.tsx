'use client';

import { Achievement, getRarityColor, getRarityGlow } from '@/lib/gamification';

interface AchievementCardProps {
  achievement: Achievement;
  unlocked: boolean;
  showAnimation?: boolean;
}

export function AchievementCard({ achievement, unlocked, showAnimation = false }: AchievementCardProps) {
  const rarityColor = getRarityColor(achievement.rarity);
  const rarityGlow = unlocked ? getRarityGlow(achievement.rarity) : 'none';

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl p-4 hover-lift
        ${showAnimation ? 'achievement-unlock' : ''}
        ${unlocked ? 'achievement-shine' : ''}
      `}
      style={{
        backgroundColor: unlocked ? 'var(--color-surface)' : 'var(--color-surface-hover)',
        border: `2px solid ${unlocked ? rarityColor : 'var(--color-border)'}`,
        boxShadow: rarityGlow,
        opacity: unlocked ? 1 : 0.5,
      }}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg text-2xl"
          style={{
            backgroundColor: unlocked ? `${rarityColor}22` : 'var(--color-surface)',
            filter: unlocked ? 'none' : 'grayscale(100%)',
          }}
        >
          {unlocked ? achievement.icon : '🔒'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3
              className="font-semibold text-sm truncate"
              style={{ color: unlocked ? 'var(--color-text)' : 'var(--color-text-muted)' }}
            >
              {achievement.title}
            </h3>
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase"
              style={{
                backgroundColor: `${rarityColor}22`,
                color: rarityColor,
              }}
            >
              {achievement.rarity}
            </span>
          </div>

          <p
            className="text-xs mt-0.5 line-clamp-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {achievement.description}
          </p>

          {/* XP Reward */}
          <div className="flex items-center gap-1 mt-2">
            <span className="text-xs">⭐</span>
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: unlocked ? 'var(--color-primary)' : 'var(--color-text-muted)' }}
            >
              +{achievement.xpReward} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

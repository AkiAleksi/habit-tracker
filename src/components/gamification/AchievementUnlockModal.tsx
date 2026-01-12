'use client';

import { useEffect, useState } from 'react';
import { Achievement, getRarityColor, getRarityGlow } from '@/lib/gamification';

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementUnlockModal({ achievement, onClose }: AchievementUnlockModalProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (achievement) {
      setTimeout(() => setShowContent(true), 100);

      // Auto-close after 4 seconds
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  const rarityColor = getRarityColor(achievement.rarity);
  const rarityGlow = getRarityGlow(achievement.rarity);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop"
      onClick={onClose}
    >
      {showContent && (
        <div
          className="achievement-unlock text-center p-8 rounded-2xl max-w-sm mx-4"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: `2px solid ${rarityColor}`,
            boxShadow: rarityGlow,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Achievement icon */}
          <div
            className="bounce-in inline-flex items-center justify-center w-20 h-20 rounded-2xl text-5xl mb-4"
            style={{
              backgroundColor: `${rarityColor}22`,
              boxShadow: rarityGlow,
            }}
          >
            {achievement.icon}
          </div>

          {/* Unlock text */}
          <p
            className="text-sm font-semibold uppercase tracking-wider mb-2"
            style={{ color: rarityColor }}
          >
            Saavutus avattu!
          </p>

          {/* Achievement title */}
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: 'var(--color-text)' }}
          >
            {achievement.title}
          </h2>

          {/* Rarity badge */}
          <span
            className="inline-block rounded px-2 py-0.5 text-xs font-semibold uppercase mb-3"
            style={{
              backgroundColor: `${rarityColor}22`,
              color: rarityColor,
            }}
          >
            {achievement.rarity}
          </span>

          {/* Description */}
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {achievement.description}
          </p>

          {/* XP Reward */}
          <div
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2"
            style={{ backgroundColor: 'var(--color-success-bg)' }}
          >
            <span className="text-lg">⭐</span>
            <span
              className="font-mono font-bold"
              style={{ color: 'var(--color-primary)' }}
            >
              +{achievement.xpReward} XP
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="mt-6 block w-full px-6 py-2 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: rarityColor,
              color: 'white',
            }}
          >
            Loistavaa!
          </button>
        </div>
      )}
    </div>
  );
}

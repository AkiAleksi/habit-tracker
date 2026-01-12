'use client';

import Link from 'next/link';
import { useGamificationContext } from '@/contexts/GamificationContext';
import { PlayerStats } from '@/components/gamification';

export function PlayerStatsCard() {
  const {
    currentLevel,
    nextLevel,
    xpProgress,
    stats,
    unlockedAchievements,
    allAchievements,
  } = useGamificationContext();

  return (
    <Link href="/stats" className="block">
      <PlayerStats
        level={currentLevel}
        stats={stats}
        xpProgress={xpProgress}
        nextLevel={nextLevel}
        unlockedCount={unlockedAchievements.length}
        totalAchievements={allAchievements.length}
      />
    </Link>
  );
}

// DevHabit Gamification System
// XP, Levels, and Achievements for Developer Growth

export interface Level {
  level: number;
  title: string;
  minXP: number;
  icon: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: AchievementRequirement;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementRequirement {
  type: 'streak' | 'total_completions' | 'habits_count' | 'perfect_days' | 'level' | 'first_habit';
  value: number;
}

export interface UserStats {
  totalXP: number;
  totalCompletions: number;
  currentStreak: number;
  longestStreak: number;
  perfectDays: number;
  habitsCreated: number;
}

// Level progression - Developer career path
export const LEVELS: Level[] = [
  { level: 1, title: 'Noob', minXP: 0, icon: '🌱' },
  { level: 2, title: 'Padawan', minXP: 100, icon: '📚' },
  { level: 3, title: 'Apprentice', minXP: 300, icon: '⚡' },
  { level: 4, title: 'Junior Dev', minXP: 600, icon: '💻' },
  { level: 5, title: 'Developer', minXP: 1000, icon: '🔧' },
  { level: 6, title: 'Mid-Level', minXP: 1500, icon: '🎯' },
  { level: 7, title: 'Senior Dev', minXP: 2200, icon: '🚀' },
  { level: 8, title: 'Tech Lead', minXP: 3000, icon: '👑' },
  { level: 9, title: 'Architect', minXP: 4000, icon: '🏗️' },
  { level: 10, title: 'Principal', minXP: 5500, icon: '💎' },
  { level: 11, title: '10x Dev', minXP: 7500, icon: '⚔️' },
  { level: 12, title: 'Legend', minXP: 10000, icon: '🏆' },
];

// XP rewards
export const XP_REWARDS = {
  HABIT_COMPLETION: 10,
  STREAK_BONUS_3: 5,
  STREAK_BONUS_7: 15,
  STREAK_BONUS_14: 25,
  STREAK_BONUS_30: 50,
  PERFECT_DAY: 25,
  NEW_HABIT: 20,
};

// Achievements
export const ACHIEVEMENTS: Achievement[] = [
  // First steps
  {
    id: 'first_habit',
    title: 'Hello World',
    description: 'Luo ensimmäinen tapa',
    icon: '👋',
    xpReward: 50,
    requirement: { type: 'first_habit', value: 1 },
    rarity: 'common',
  },
  {
    id: 'first_completion',
    title: 'First Commit',
    description: 'Suorita tapa ensimmäistä kertaa',
    icon: '✅',
    xpReward: 25,
    requirement: { type: 'total_completions', value: 1 },
    rarity: 'common',
  },

  // Streak achievements
  {
    id: 'streak_3',
    title: 'Warming Up',
    description: '3 päivän streak',
    icon: '🔥',
    xpReward: 50,
    requirement: { type: 'streak', value: 3 },
    rarity: 'common',
  },
  {
    id: 'streak_7',
    title: 'On Fire',
    description: '7 päivän streak',
    icon: '💪',
    xpReward: 100,
    requirement: { type: 'streak', value: 7 },
    rarity: 'rare',
  },
  {
    id: 'streak_14',
    title: 'Unstoppable',
    description: '14 päivän streak',
    icon: '⚡',
    xpReward: 200,
    requirement: { type: 'streak', value: 14 },
    rarity: 'rare',
  },
  {
    id: 'streak_30',
    title: 'Legendary Streak',
    description: '30 päivän streak',
    icon: '👑',
    xpReward: 500,
    requirement: { type: 'streak', value: 30 },
    rarity: 'epic',
  },
  {
    id: 'streak_100',
    title: 'Centurion',
    description: '100 päivän streak',
    icon: '🏆',
    xpReward: 1000,
    requirement: { type: 'streak', value: 100 },
    rarity: 'legendary',
  },

  // Completion milestones
  {
    id: 'completions_10',
    title: 'Getting Started',
    description: '10 suoritusta yhteensä',
    icon: '🎯',
    xpReward: 50,
    requirement: { type: 'total_completions', value: 10 },
    rarity: 'common',
  },
  {
    id: 'completions_50',
    title: 'Consistent',
    description: '50 suoritusta yhteensä',
    icon: '📈',
    xpReward: 150,
    requirement: { type: 'total_completions', value: 50 },
    rarity: 'rare',
  },
  {
    id: 'completions_100',
    title: 'Century',
    description: '100 suoritusta yhteensä',
    icon: '💯',
    xpReward: 300,
    requirement: { type: 'total_completions', value: 100 },
    rarity: 'rare',
  },
  {
    id: 'completions_500',
    title: 'Dedicated',
    description: '500 suoritusta yhteensä',
    icon: '🌟',
    xpReward: 750,
    requirement: { type: 'total_completions', value: 500 },
    rarity: 'epic',
  },
  {
    id: 'completions_1000',
    title: 'Master',
    description: '1000 suoritusta yhteensä',
    icon: '🎖️',
    xpReward: 1500,
    requirement: { type: 'total_completions', value: 1000 },
    rarity: 'legendary',
  },

  // Perfect days
  {
    id: 'perfect_day_1',
    title: 'Perfect Day',
    description: 'Suorita kaikki tavat päivässä',
    icon: '⭐',
    xpReward: 50,
    requirement: { type: 'perfect_days', value: 1 },
    rarity: 'common',
  },
  {
    id: 'perfect_day_7',
    title: 'Perfect Week',
    description: '7 täydellistä päivää',
    icon: '🌈',
    xpReward: 200,
    requirement: { type: 'perfect_days', value: 7 },
    rarity: 'rare',
  },
  {
    id: 'perfect_day_30',
    title: 'Perfect Month',
    description: '30 täydellistä päivää',
    icon: '💎',
    xpReward: 500,
    requirement: { type: 'perfect_days', value: 30 },
    rarity: 'epic',
  },

  // Habits count
  {
    id: 'habits_3',
    title: 'Triple Threat',
    description: 'Luo 3 tapaa',
    icon: '🎲',
    xpReward: 75,
    requirement: { type: 'habits_count', value: 3 },
    rarity: 'common',
  },
  {
    id: 'habits_5',
    title: 'High Five',
    description: 'Luo 5 tapaa',
    icon: '🖐️',
    xpReward: 150,
    requirement: { type: 'habits_count', value: 5 },
    rarity: 'rare',
  },

  // Level achievements
  {
    id: 'level_5',
    title: 'Developer Status',
    description: 'Saavuta taso 5',
    icon: '💻',
    xpReward: 200,
    requirement: { type: 'level', value: 5 },
    rarity: 'rare',
  },
  {
    id: 'level_10',
    title: 'Principal Engineer',
    description: 'Saavuta taso 10',
    icon: '🏅',
    xpReward: 500,
    requirement: { type: 'level', value: 10 },
    rarity: 'epic',
  },
  {
    id: 'level_12',
    title: 'Legendary Status',
    description: 'Saavuta taso 12',
    icon: '👾',
    xpReward: 1000,
    requirement: { type: 'level', value: 12 },
    rarity: 'legendary',
  },
];

// Helper functions
export function getLevelFromXP(xp: number): Level {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXP) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

export function getNextLevel(currentLevel: number): Level | null {
  const nextIndex = LEVELS.findIndex(l => l.level === currentLevel + 1);
  return nextIndex >= 0 ? LEVELS[nextIndex] : null;
}

export function getXPProgress(xp: number): { current: number; needed: number; percentage: number } {
  const currentLevel = getLevelFromXP(xp);
  const nextLevel = getNextLevel(currentLevel.level);

  if (!nextLevel) {
    return { current: xp, needed: xp, percentage: 100 };
  }

  const xpInCurrentLevel = xp - currentLevel.minXP;
  const xpNeededForNext = nextLevel.minXP - currentLevel.minXP;
  const percentage = Math.min((xpInCurrentLevel / xpNeededForNext) * 100, 100);

  return {
    current: xpInCurrentLevel,
    needed: xpNeededForNext,
    percentage,
  };
}

export function checkAchievementUnlocked(
  achievement: Achievement,
  stats: UserStats,
  currentLevel: number
): boolean {
  const { type, value } = achievement.requirement;

  switch (type) {
    case 'streak':
      return stats.longestStreak >= value;
    case 'total_completions':
      return stats.totalCompletions >= value;
    case 'habits_count':
      return stats.habitsCreated >= value;
    case 'perfect_days':
      return stats.perfectDays >= value;
    case 'level':
      return currentLevel >= value;
    case 'first_habit':
      return stats.habitsCreated >= 1;
    default:
      return false;
  }
}

export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return '#8b949e';
    case 'rare':
      return '#58a6ff';
    case 'epic':
      return '#a855f7';
    case 'legendary':
      return '#f97316';
    default:
      return '#8b949e';
  }
}

export function getRarityGlow(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common':
      return 'none';
    case 'rare':
      return '0 0 20px rgba(88, 166, 255, 0.3)';
    case 'epic':
      return '0 0 20px rgba(168, 85, 247, 0.4)';
    case 'legendary':
      return '0 0 25px rgba(249, 115, 22, 0.5)';
    default:
      return 'none';
  }
}

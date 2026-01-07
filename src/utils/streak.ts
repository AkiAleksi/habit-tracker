import { getDateKey, getTodayKey } from './date';

/**
 * Calculate current streak for a habit based on its completion logs
 * @param logs - Record of date -> completed status
 * @returns Current streak count
 */
export function calculateStreak(logs: Record<string, boolean>): number {
  const today = getTodayKey();
  let streak = 0;
  const currentDate = new Date();

  // If today is completed, start counting from today
  // Otherwise, start from yesterday
  if (!logs[today]) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  // Count consecutive completed days going backwards
  while (true) {
    const dateKey = getDateKey(currentDate);
    if (logs[dateKey]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Format streak for display
 * @example "7 päivää" or "" if 0
 */
export function formatStreak(days: number): string {
  if (days === 0) return '';
  if (days === 1) return '1 päivä';
  return `${days} päivää`;
}

/**
 * Check if streak has hit a milestone
 * @returns Milestone number if hit, null otherwise
 */
export function checkStreakMilestone(streak: number): number | null {
  const milestones = [7, 14, 30, 60, 100, 365];
  return milestones.includes(streak) ? streak : null;
}

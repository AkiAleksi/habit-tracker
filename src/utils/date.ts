/**
 * Format date in Finnish locale
 * @example "Tiistai 7.1."
 */
export function formatDateFi(date: Date): string {
  const weekday = date.toLocaleDateString('fi-FI', { weekday: 'long' });
  const day = date.getDate();
  const month = date.getMonth() + 1;

  // Capitalize first letter
  const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return `${capitalizedWeekday} ${day}.${month}.`;
}

/**
 * Get today's date as YYYY-MM-DD string
 */
export function getTodayKey(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get date key from Date object
 */
export function getDateKey(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Check if a date string is today
 */
export function isToday(dateKey: string): boolean {
  return dateKey === getTodayKey();
}

/**
 * Get yesterday's date key
 */
export function getYesterdayKey(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return getDateKey(yesterday);
}

export interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  order: number;
}

export interface HabitLog {
  date: string; // YYYY-MM-DD format
  completed: boolean;
  completedAt?: Date;
}

export interface HabitWithStats extends Habit {
  logs: Record<string, HabitLog>; // key = date string
  currentStreak: number;
  longestStreak: number;
}

export interface DailyProgress {
  completed: number;
  total: number;
  percentage: number;
}

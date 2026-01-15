'use client';

import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { useHabitsContext } from '@/contexts/HabitsContext';

export default function HistoryPage() {
  const { habits, isLoaded, getStreak, isCompletedToday } = useHabitsContext();

  // Get last 7 days
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        date: date.toISOString().split('T')[0],
        dayName: date.toLocaleDateString('fi-FI', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isToday: i === 0,
      });
    }
    return days;
  };

  const days = getLast7Days();

  if (!isLoaded) {
    return (
      <main
        className="min-h-screen py-4"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        <Container>
          <div className="flex items-center gap-3 py-4">
            <div
              className="h-6 w-24 animate-pulse rounded"
              style={{ backgroundColor: 'var(--color-surface)' }}
            />
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen py-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Container>
        {/* Header */}
        <header className="flex items-center gap-3 py-4">
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-2 hover:opacity-70"
            style={{ color: 'var(--color-text)' }}
            aria-label="Takaisin"
          >
            <BackIcon />
          </Link>
          <h1
            className="text-xl font-bold"
            style={{ color: 'var(--color-text)' }}
          >
            Historia
          </h1>
        </header>

        {/* Stats summary */}
        <section className="mb-6">
          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <h2
              className="mb-3 text-lg font-semibold"
              style={{ color: 'var(--color-text)' }}
            >
              Yhteenveto
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {habits.length}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Tapaa yhteensä
                </p>
              </div>
              <div>
                <p
                  className="text-2xl font-bold"
                  style={{ color: 'var(--color-success)' }}
                >
                  {habits.reduce((max, h) => Math.max(max, getStreak(h.id)), 0)}
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Pisin putkesi
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Habits with streaks */}
        <section className="mb-6">
          <h2
            className="mb-3 text-sm font-medium uppercase tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tapojen putket
          </h2>

          {habits.length === 0 ? (
            <div
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: 'var(--color-surface)' }}
            >
              <p
                className="text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Ei vielä tapoja.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map((habit) => {
                const streak = getStreak(habit.id);
                const completedToday = isCompletedToday(habit.id);

                return (
                  <div
                    key={habit.id}
                    className="rounded-xl p-4"
                    style={{ backgroundColor: 'var(--color-surface)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="font-medium"
                        style={{ color: 'var(--color-text)' }}
                      >
                        {habit.name}
                      </span>
                      <span
                        className="flex items-center gap-1 text-sm"
                        style={{ color: streak > 0 ? 'var(--color-success)' : 'var(--color-text-muted)' }}
                      >
                        🔥 {streak} pv
                      </span>
                    </div>

                    {/* Week view */}
                    <div className="flex justify-between mt-3">
                      {days.map((day) => {
                        const isCompleted = day.isToday ? completedToday : false;

                        return (
                          <div
                            key={day.date}
                            className="flex flex-col items-center"
                          >
                            <span
                              className="text-xs mb-1"
                              style={{ color: 'var(--color-text-muted)' }}
                            >
                              {day.dayName}
                            </span>
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium"
                              style={{
                                backgroundColor: isCompleted
                                  ? 'var(--color-success)'
                                  : day.isToday
                                  ? 'var(--color-primary)'
                                  : 'var(--color-background)',
                                color: isCompleted || day.isToday
                                  ? 'white'
                                  : 'var(--color-text-muted)',
                              }}
                            >
                              {day.dayNumber}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}

function BackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { DateDisplay } from '@/components/dashboard/DateDisplay';
import { DailyProgress } from '@/components/dashboard/DailyProgress';
import { HabitList } from '@/components/habits/HabitList';
import { PlayerStatsCard } from '@/components/dashboard/PlayerStatsCard';
import { AccountBanner } from '@/components/auth/AccountBanner';

export default function Home() {
  return (
    <main
      className="min-h-screen py-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Container>
        <Header />

        <AccountBanner />

        <section className="mb-6 space-y-4">
          <DateDisplay />
          <PlayerStatsCard />
          <DailyProgress />
        </section>

        <section>
          <HabitList />
        </section>
      </Container>
    </main>
  );
}

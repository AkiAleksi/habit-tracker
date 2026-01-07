import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { DateDisplay } from '@/components/dashboard/DateDisplay';
import { WelcomeMessage } from '@/components/dashboard/WelcomeMessage';
import { HabitList } from '@/components/habits/HabitList';

export default function Home() {
  return (
    <main
      className="min-h-screen py-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <Container>
        <Header />

        <section className="mb-6">
          <DateDisplay />
          <WelcomeMessage />
        </section>

        <section>
          <HabitList />
        </section>
      </Container>
    </main>
  );
}

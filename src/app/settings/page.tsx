'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterModal } from '@/components/auth/RegisterModal';
import { LoginModal } from '@/components/auth/LoginModal';

export default function SettingsPage() {
  const { user, loading, signOut } = useAuth();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (loading) {
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
            Asetukset
          </h1>
        </header>

        {/* Account section */}
        <section className="mb-8">
          <h2
            className="mb-3 text-sm font-medium uppercase tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tili
          </h2>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {user?.isAnonymous ? (
              <div className="space-y-3">
                <p style={{ color: 'var(--color-text)' }}>
                  Olet kirjautunut nimettömänä.
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  Luo tili varmistaaksesi, ettet menetä tietojasi.
                </p>
                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={() => setIsRegisterOpen(true)}>
                    Luo tili
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Kirjaudu sisään
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p style={{ color: 'var(--color-text)' }}>
                  Kirjautunut tilillä:
                </p>
                <p
                  className="font-medium"
                  style={{ color: 'var(--color-text)' }}
                >
                  {user?.email}
                </p>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? 'Kirjaudutaan ulos...' : 'Kirjaudu ulos'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Info section */}
        <section className="mb-8">
          <h2
            className="mb-3 text-sm font-medium uppercase tracking-wide"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tietoja
          </h2>

          <div
            className="rounded-xl p-4"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            <p
              className="font-medium"
              style={{ color: 'var(--color-text)' }}
            >
              Habit Tracker
            </p>
            <p
              className="text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Yksinkertainen tapaseuranta-sovellus
            </p>
          </div>
        </section>

        {/* Version */}
        <footer
          className="text-center text-sm"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Versio 1.0.0
        </footer>

        {/* Modals */}
        <RegisterModal
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
        />
        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
        />
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

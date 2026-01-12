'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { RegisterModal } from './RegisterModal';
import { LoginModal } from './LoginModal';

export function AccountBanner() {
  const { user, loading } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Don't show if loading, not anonymous, or dismissed
  if (loading || !user?.isAnonymous || dismissed) {
    return null;
  }

  return (
    <>
      <div
        className="relative rounded-xl p-4 mb-4"
        style={{
          backgroundColor: 'var(--color-primary-bg)',
          border: '1px solid var(--color-primary)',
        }}
      >
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 p-1 rounded hover:bg-[var(--color-surface-hover)]"
          aria-label="Sulje"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-text-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <h3
              className="font-semibold text-sm"
              style={{ color: 'var(--color-text)' }}
            >
              Tallenna edistymisesi
            </h3>
            <p
              className="text-xs mt-0.5"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Luo tili säilyttääksesi tavat ja XP-pisteesi turvassa.
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowRegister(true)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                }}
              >
                Luo tili
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                }}
              >
                Kirjaudu
              </button>
            </div>
          </div>
        </div>
      </div>

      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}

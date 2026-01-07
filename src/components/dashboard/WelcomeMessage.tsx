'use client';

import { useState, useEffect } from 'react';
import { getTimeBasedGreeting } from '@/lib/messages';

export function WelcomeMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Set message on client side to avoid hydration mismatch
    setMessage(getTimeBasedGreeting());
  }, []);

  if (!message) {
    return null;
  }

  return (
    <p
      className="text-base"
      style={{ color: 'var(--color-text-muted)' }}
    >
      {message}
    </p>
  );
}

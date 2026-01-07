'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { registerWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): string | null => {
    if (!email.trim()) {
      return 'Sähköposti on pakollinen.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Virheellinen sähköpostiosoite.';
    }
    if (password.length < 8) {
      return 'Salasanan tulee olla vähintään 8 merkkiä.';
    }
    if (password !== confirmPassword) {
      return 'Salasanat eivät täsmää.';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      await registerWithEmail(email, password);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Rekisteröinti epäonnistui.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Luo tili">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="register-email"
            className="mb-1 block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Sähköposti
          </label>
          <Input
            id="register-email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="esimerkki@email.com"
            autoComplete="email"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-1 block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Salasana
          </label>
          <Input
            id="register-password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Vähintään 8 merkkiä"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="register-confirm-password"
            className="mb-1 block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Vahvista salasana
          </label>
          <Input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Kirjoita salasana uudelleen"
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p
            className="text-sm"
            style={{ color: 'var(--color-error, #dc2626)' }}
          >
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1"
          >
            Peruuta
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1"
          >
            {isLoading ? 'Rekisteröidään...' : 'Rekisteröidy'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

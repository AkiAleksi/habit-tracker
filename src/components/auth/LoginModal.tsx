'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Täytä kaikki kentät.');
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      handleClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Kirjautuminen epäonnistui.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Kirjaudu sisään">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="mb-1 block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Sähköposti
          </label>
          <Input
            id="login-email"
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
            htmlFor="login-password"
            className="mb-1 block text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Salasana
          </label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={setPassword}
            placeholder="Salasanasi"
            autoComplete="current-password"
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
            {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

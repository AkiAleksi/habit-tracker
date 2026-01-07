'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export function AddHabitModal({ isOpen, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Anna tavalle nimi');
      return;
    }

    onAdd(trimmedName);
    setName('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setName('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Lisää uusi tapa">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="habit-name"
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tavan nimi
          </label>
          <Input
            id="habit-name"
            value={name}
            onChange={(value) => {
              setName(value);
              setError('');
            }}
            placeholder="esim. Meditoi 10 min"
            autoFocus
          />
          {error && (
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--color-accent)' }}
            >
              {error}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            className="flex-1"
          >
            Peruuta
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Tallenna
          </Button>
        </div>
      </form>
    </Modal>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

interface EditHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentName: string;
}

export function EditHabitModal({ isOpen, onClose, onSave, currentName }: EditHabitModalProps) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');

  // Update name when modal opens with a different habit
  useEffect(() => {
    setName(currentName);
    setError('');
  }, [currentName, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Anna tavalle nimi');
      return;
    }

    onSave(trimmedName);
    onClose();
  };

  const handleClose = () => {
    setName(currentName);
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Muokkaa tapaa">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="edit-habit-name"
            className="mb-2 block text-sm font-medium"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Tavan nimi
          </label>
          <Input
            id="edit-habit-name"
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

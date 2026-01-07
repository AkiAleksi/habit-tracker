'use client';

import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Poista',
  cancelText = 'Peruuta',
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p
        className="mb-6 text-sm"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {message}
      </p>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={onClose}
          className="flex-1"
        >
          {cancelText}
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirm}
          className="flex-1"
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}

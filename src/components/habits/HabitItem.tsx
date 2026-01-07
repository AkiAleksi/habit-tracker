'use client';

import { useState, useRef } from 'react';

import { formatStreak } from '@/utils/streak';

interface HabitItemProps {
  name: string;
  completed: boolean;
  streak: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitItem({ name, completed, streak, onToggle, onEdit, onDelete }: HabitItemProps) {
  const [showActions, setShowActions] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const isLongPress = useRef(false);

  const handleTouchStart = () => {
    isLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      isLongPress.current = true;
      setShowActions(true);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
    if (!isLongPress.current) {
      onToggle();
    }
  };

  const handleTouchMove = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // For desktop: toggle on click, show actions on right-click
    if (e.type === 'contextmenu') {
      e.preventDefault();
      setShowActions(true);
    }
  };

  if (showActions) {
    return (
      <div
        className="flex items-center gap-2 rounded-xl p-4"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <span
          className="flex-1 truncate text-base font-medium"
          style={{ color: 'var(--color-text)' }}
        >
          {name}
        </span>

        <button
          onClick={() => {
            setShowActions(false);
            onEdit();
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-70"
          style={{ backgroundColor: 'var(--color-background)' }}
          aria-label="Muokkaa"
        >
          <EditIcon />
        </button>

        <button
          onClick={() => {
            setShowActions(false);
            onDelete();
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-70"
          style={{ backgroundColor: 'var(--color-background)' }}
          aria-label="Poista"
        >
          <DeleteIcon />
        </button>

        <button
          onClick={() => setShowActions(false)}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-70"
          style={{ backgroundColor: 'var(--color-background)' }}
          aria-label="Peruuta"
        >
          <CloseIcon />
        </button>
      </div>
    );
  }

  return (
    <button
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onClick={onToggle}
      onContextMenu={handleClick}
      className="flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all active:scale-[0.98]"
      style={{
        backgroundColor: completed ? 'var(--color-primary)' : 'var(--color-surface)',
        opacity: completed ? 0.9 : 1,
      }}
    >
      {/* Checkbox circle */}
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition-all"
        style={{
          borderColor: completed ? 'white' : 'var(--color-primary)',
          backgroundColor: completed ? 'white' : 'transparent',
        }}
      >
        {completed && <CheckIcon />}
      </div>

      {/* Habit name */}
      <span
        className="flex-1 text-base font-medium transition-all"
        style={{
          color: completed ? 'white' : 'var(--color-text)',
          textDecoration: completed ? 'line-through' : 'none',
          opacity: completed ? 0.9 : 1,
        }}
      >
        {name}
      </span>

      {/* Streak badge */}
      {streak > 0 && (
        <span
          className="shrink-0 text-sm font-medium"
          style={{
            color: completed ? 'rgba(255,255,255,0.8)' : 'var(--color-text-muted)',
          }}
        >
          {formatStreak(streak)}
        </span>
      )}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-primary)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-text-muted)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-text-muted)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

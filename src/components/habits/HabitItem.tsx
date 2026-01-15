'use client';

interface HabitItemProps {
  name: string;
  completed: boolean;
  streak: number;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function HabitItem({ name, completed, streak, onToggle, onEdit, onDelete }: HabitItemProps) {
  return (
    <div
      className={`flex w-full items-center gap-3 rounded-xl p-4 transition-all ${completed ? 'pulse-success' : ''}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: `1px solid ${completed ? 'var(--color-success)' : 'var(--color-border)'}`,
      }}
    >
      {/* Checkbox - clickable area for toggle */}
      <button
        onClick={onToggle}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all cursor-pointer hover:scale-110 active:scale-95"
        style={{
          backgroundColor: completed ? 'var(--color-success)' : 'transparent',
          border: completed ? 'none' : '2px solid var(--color-border)',
        }}
        aria-label={completed ? 'Merkitse tekemättömäksi' : 'Merkitse tehdyksi'}
      >
        {completed && <CheckIcon />}
      </button>

      {/* Habit name - also clickable for toggle */}
      <button
        onClick={onToggle}
        className="flex-1 min-w-0 text-left cursor-pointer"
      >
        <span
          className="block truncate text-base font-medium transition-all"
          style={{
            color: completed ? 'var(--color-text-muted)' : 'var(--color-text)',
            textDecoration: completed ? 'line-through' : 'none',
          }}
        >
          {name}
        </span>
      </button>

      {/* Streak badge */}
      {streak > 0 && (
        <div
          className={`flex items-center gap-1 shrink-0 rounded-md px-2 py-1 ${streak >= 7 ? 'streak-glow' : ''}`}
          style={{
            backgroundColor: streak >= 7 ? 'var(--color-streak-bg)' : 'var(--color-surface-hover)',
          }}
        >
          <span style={{ fontSize: '12px' }}>🔥</span>
          <span
            className="font-mono text-xs font-semibold"
            style={{
              color: streak >= 7 ? 'var(--color-streak)' : 'var(--color-text-muted)',
            }}
          >
            {streak}
          </span>
        </div>
      )}

      {/* Action buttons - always visible */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onEdit}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-[var(--color-surface-hover)]"
          aria-label="Muokkaa"
        >
          <EditIcon />
        </button>

        <button
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors cursor-pointer hover:bg-[rgba(248,81,73,0.15)]"
          aria-label="Poista"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
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


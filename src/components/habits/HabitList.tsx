'use client';

import { useState } from 'react';
import { HabitItem } from './HabitItem';
import { AddHabitModal } from './AddHabitModal';
import { EditHabitModal } from './EditHabitModal';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useHabitsContext, Habit } from '@/contexts/HabitsContext';
import { useGamificationContext } from '@/contexts/GamificationContext';

export function HabitList() {
  const { habits, isLoaded, addHabit, toggleHabit, editHabit, deleteHabit, isCompletedToday, getStreak } = useHabitsContext();
  const { awardCompletionXP, awardNewHabitXP } = useGamificationContext();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [deletingHabit, setDeletingHabit] = useState<Habit | null>(null);

  // Show loading state while data is being loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-xl"
            style={{ backgroundColor: 'var(--color-surface)' }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {habits.length === 0 ? (
        <div
          className="rounded-xl p-6 text-center"
          style={{ backgroundColor: 'var(--color-surface)' }}
        >
          <p
            className="text-sm"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Ei vielä tapoja. Lisää ensimmäinen!
          </p>
        </div>
      ) : (
        habits.map((habit) => (
          <HabitItem
            key={habit.id}
            name={habit.name}
            completed={isCompletedToday(habit.id)}
            streak={getStreak(habit.id)}
            onToggle={() => {
              const wasCompleted = isCompletedToday(habit.id);
              toggleHabit(habit.id);
              // Award XP only when completing (not uncompleting)
              if (!wasCompleted) {
                const streak = getStreak(habit.id) + 1; // +1 because streak increases after toggle
                awardCompletionXP(streak);
              }
            }}
            onEdit={() => setEditingHabit(habit)}
            onDelete={() => setDeletingHabit(habit)}
          />
        ))
      )}

      {/* Add habit button */}
      <Button
        variant="secondary"
        onClick={() => setIsAddModalOpen(true)}
        className="mt-2 flex items-center justify-center gap-2"
      >
        <PlusIcon />
        Lisää tapa
      </Button>

      {/* Add habit modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={(name) => {
          addHabit(name);
          awardNewHabitXP();
        }}
      />

      {/* Edit habit modal */}
      <EditHabitModal
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        onSave={(newName) => {
          if (editingHabit) {
            editHabit(editingHabit.id, newName);
          }
        }}
        currentName={editingHabit?.name || ''}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deletingHabit}
        onClose={() => setDeletingHabit(null)}
        onConfirm={() => {
          if (deletingHabit) {
            deleteHabit(deletingHabit.id);
          }
        }}
        title="Poista tapa"
        message={`Haluatko varmasti poistaa tavan "${deletingHabit?.name}"? Tätä ei voi perua.`}
      />
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

# Story 2.1: Add New Habit

**Epic:** [Epic 2: CRUD](../epics/epic-2-crud.md)
**Status:** Draft
**Priority:** P0
**Depends on:** Story 1.3

---

## User Story

**As a** user,
**I want** to add a new habit with a name,
**so that** I can track my personal goals.

---

## Acceptance Criteria

1. "Lisää tapa" -nappi näkyy dashboardilla
2. Nappi avaa modaalin/bottom sheetin
3. Modaalissa on tekstikenttä tavan nimelle
4. "Tallenna" luo uuden tavan ja sulkee modaalin
5. Uusi tapa ilmestyy listaan välittömästi
6. Tyhjää nimeä ei voi tallentaa (validointi)
7. Modaalin voi sulkea peruuttamalla

---

## Technical Notes

### Components to Create

- `src/components/ui/Modal.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/habits/AddHabitModal.tsx`

### State Management

```typescript
// In Dashboard or HabitsContext
const [habits, setHabits] = useState<Habit[]>([]);
const [isAddModalOpen, setIsAddModalOpen] = useState(false);

const addHabit = (name: string) => {
  const newHabit: Habit = {
    id: crypto.randomUUID(),
    name,
    createdAt: new Date(),
    order: habits.length,
  };
  setHabits([...habits, newHabit]);
};
```

### Validation

- Name must be non-empty after trim
- Max length: 50 characters
- Show error message if invalid

---

## UI Mockup

```
Dashboard:                    Modal:
┌────────────────────┐       ┌────────────────────┐
│ [Habit List...]    │       │                    │
│                    │       │   Lisää uusi tapa  │
│                    │       │                    │
│ ╔══════════════╗   │       │ ┌────────────────┐ │
│ ║  + Lisää     ║   │  -->  │ │ Tavan nimi     │ │
│ ╚══════════════╝   │       │ └────────────────┘ │
└────────────────────┘       │                    │
                             │ [Peruuta] [Tallenna] │
                             └────────────────────┘
```

---

## Definition of Done

- [ ] "Lisää tapa" -nappi toimii
- [ ] Modal avautuu ja sulkeutuu
- [ ] Uusi tapa lisätään listaan
- [ ] Validointi toimii

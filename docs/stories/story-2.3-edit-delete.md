# Story 2.3: Edit and Delete Habit

**Epic:** [Epic 2: CRUD](../epics/epic-2-crud.md)
**Status:** Draft
**Priority:** P0
**Depends on:** Story 2.2

---

## User Story

**As a** user,
**I want** to edit or delete existing habits,
**so that** I can manage my habit list over time.

---

## Acceptance Criteria

1. Swipe left (tai long press) näyttää muokkaus/poisto-valinnat
2. "Muokkaa" avaa modaalin esitäytetyllä nimellä
3. Nimen muutos tallentuu ja näkyy listassa
4. "Poista" pyytää vahvistuksen
5. Vahvistuksen jälkeen tapa poistetaan pysyvästi
6. Poisto päivittää tallennustilan välittömästi

---

## Technical Notes

### Components to Create

- `src/components/habits/EditHabitModal.tsx`
- `src/components/ui/ConfirmDialog.tsx`
- Swipe actions in `HabitItem.tsx`

### Swipe Implementation Options

1. **CSS-only:** Transform on touch/drag
2. **Library:** `react-swipeable` or `use-gesture`
3. **Simple:** Long press to show menu

For MVP, recommend **long press** (simpler):

```typescript
const [showActions, setShowActions] = useState(false);

const handleLongPress = () => {
  setShowActions(true);
};
```

### Edit Function

```typescript
const editHabit = (id: string, newName: string) => {
  setHabits(habits.map(h =>
    h.id === id ? { ...h, name: newName } : h
  ));
};
```

### Delete with Confirmation

```typescript
const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

const confirmDelete = (id: string) => {
  setDeleteConfirmId(id);
};

const executeDelete = () => {
  setHabits(habits.filter(h => h.id !== deleteConfirmId));
  setDeleteConfirmId(null);
};
```

---

## UI Mockup

```
Long press reveals:
┌────────────────────────────────────┐
│ ○  Meditoi 10 min    [✏️] [🗑️]    │
└────────────────────────────────────┘

Delete confirmation:
┌────────────────────────────┐
│  Poistetaanko tapa?        │
│  "Meditoi 10 min"          │
│                            │
│  [Peruuta]  [Poista]       │
└────────────────────────────┘
```

---

## Definition of Done

- [ ] Muokkaus toimii
- [ ] Poisto toimii vahvistuksen jälkeen
- [ ] Long press näyttää toiminnot
- [ ] Muutokset tallentuvat

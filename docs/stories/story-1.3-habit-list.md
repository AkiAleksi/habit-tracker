# Story 1.3: Static Habit List Display

**Epic:** [Epic 1: Foundation](../epics/epic-1-foundation.md)
**Status:** Draft
**Priority:** P0
**Depends on:** Story 1.2

---

## User Story

**As a** user,
**I want** to see a list of example habits on the dashboard,
**so that** I understand how the app works.

---

## Acceptance Criteria

1. Dashboard näyttää 3-5 esimerkkitapaa (kovakoodattu)
2. Jokainen tapa näyttää nimen ja ympyrä/checkbox-elementin
3. Tavat on järjestetty siistiin listaan
4. Yksi napautus "toggle" -efekti toimii (visuaalinen, ei vielä persistointi)
5. Completed-tila näkyy visuaalisesti (esim. yliviivaus, värinvaihto)
6. Kosketusalueet ovat riittävän suuret (min 44x44px)

---

## Technical Notes

### Components to Create

- `src/components/habits/HabitList.tsx`
- `src/components/habits/HabitItem.tsx`

### Sample Data

```typescript
const SAMPLE_HABITS = [
  { id: '1', name: 'Meditoi 10 min', completed: false },
  { id: '2', name: 'Liiku 30 min', completed: true },
  { id: '3', name: 'Lue 20 sivua', completed: false },
  { id: '4', name: 'Juo 8 lasia vettä', completed: false },
];
```

### HabitItem Component

```typescript
interface HabitItemProps {
  name: string;
  completed: boolean;
  onToggle: () => void;
}
```

### Styling States

- **Uncompleted:** Circle outline, normal text
- **Completed:** Filled circle with checkmark, strikethrough text, muted color

---

## UI Mockup

```
┌────────────────────────────┐
│ ○  Meditoi 10 min          │
├────────────────────────────┤
│ ●  L̶i̶i̶k̶u̶ ̶3̶0̶ ̶m̶i̶n̶            │
├────────────────────────────┤
│ ○  Lue 20 sivua            │
├────────────────────────────┤
│ ○  Juo 8 lasia vettä       │
└────────────────────────────┘
```

---

## Definition of Done

- [ ] Esimerkkitavat näkyvät listana
- [ ] Toggle toimii visuaalisesti
- [ ] Completed-tila erottuu selkeästi
- [ ] Touch targets min 44x44px

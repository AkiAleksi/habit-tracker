# Story 3.2: Daily Progress Summary

**Epic:** [Epic 3: Streaks](../epics/epic-3-streaks.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 3.1

---

## User Story

**As a** user,
**I want** to see today's overall progress at a glance,
**so that** I know how well I'm doing.

---

## Acceptance Criteria

1. Dashboard näyttää "x/y tapaa tehty" yhteenvedon
2. Visuaalinen progress bar tai prosentti
3. Kun kaikki tehty, näkyy juhlaviesti (esim. "Mahtavaa! Kaikki tehty!")
4. Viesti on kannustava myös keskeneräisenä
5. Progress päivittyy reaaliaikaisesti toggle-napauksilla

---

## Technical Notes

### Component

```typescript
// components/dashboard/DailyProgress.tsx
interface DailyProgressProps {
  completed: number;
  total: number;
}

export function DailyProgress({ completed, total }: DailyProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const isAllDone = completed === total && total > 0;

  return (
    <div>
      <div className="text-lg font-medium">
        {completed}/{total} tapaa tehty
      </div>
      <ProgressBar value={percentage} />
      {isAllDone && (
        <p className="text-primary mt-2">Mahtavaa! Kaikki tehty!</p>
      )}
    </div>
  );
}
```

### Progress Bar

```typescript
// components/ui/ProgressBar.tsx
export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
```

### Encouraging Messages

```typescript
const getProgressMessage = (completed: number, total: number): string => {
  if (total === 0) return 'Lisää ensimmäinen tapasi!';
  if (completed === 0) return 'Aloita päiväsi hyvin!';
  if (completed === total) return 'Mahtavaa! Kaikki tehty!';
  if (completed >= total / 2) return 'Hienoa työtä! Jatka samaan malliin.';
  return 'Hyvä alku! Pidä vauhtia yllä.';
};
```

---

## UI Mockup

```
┌────────────────────────────────────┐
│         3/5 tapaa tehty            │
│  ████████████░░░░░░░░  60%         │
│                                    │
│  Hienoa työtä! Jatka samaan malliin│
└────────────────────────────────────┘
```

---

## Definition of Done

- [ ] Progress näkyy dashboardilla
- [ ] Progress bar animoituu
- [ ] Viesti muuttuu tilanteen mukaan
- [ ] Päivittyy reaaliaikaisesti

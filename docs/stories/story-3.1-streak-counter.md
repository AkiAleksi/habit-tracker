# Story 3.1: Streak Counter per Habit

**Epic:** [Epic 3: Streaks](../epics/epic-3-streaks.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 2.2

---

## User Story

**As a** user,
**I want** to see my streak count for each habit,
**so that** I feel motivated to maintain consistency.

---

## Acceptance Criteria

1. Jokaisen tavan vieressä näkyy streak-luku (esim. "5 päivää")
2. Streak kasvaa kun tapa merkitään tehdyksi peräkkäisinä päivinä
3. Streak nollautuu jos päivä jää väliin
4. Streak-data tallentuu paikalliseen tallennustilaan
5. Uusilla tavoilla streak alkaa nollasta

---

## Technical Notes

### Streak Calculation

```typescript
// utils/streak.ts
export function calculateStreak(
  logs: Record<string, boolean>, // date -> completed
  today: string
): number {
  let streak = 0;
  let currentDate = new Date(today);

  // If today is completed, start counting
  // Otherwise, check from yesterday
  if (!logs[today]) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  while (true) {
    const dateKey = currentDate.toISOString().split('T')[0];
    if (logs[dateKey]) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
```

### Updated HabitItem

```typescript
interface HabitItemProps {
  habit: Habit;
  completed: boolean;
  streak: number;
  onToggle: () => void;
}
```

### Display Format

```typescript
const formatStreak = (days: number): string => {
  if (days === 0) return '';
  if (days === 1) return '1 päivä';
  return `${days} päivää`;
};
```

---

## UI Mockup

```
┌────────────────────────────────────┐
│ ●  Meditoi 10 min         7 päivää │
├────────────────────────────────────┤
│ ○  Liiku 30 min                    │
├────────────────────────────────────┤
│ ●  Lue 20 sivua          23 päivää │
└────────────────────────────────────┘
```

---

## Definition of Done

- [ ] Streak näkyy jokaisella tavalla
- [ ] Streak lasketaan oikein
- [ ] Streak nollautuu välistä
- [ ] Data tallentuu

# Story 3.3: Supportive Messages System

**Epic:** [Epic 3: Streaks](../epics/epic-3-streaks.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 3.2

---

## User Story

**As a** user,
**I want** the app to show encouraging messages,
**so that** I feel supported rather than judged.

---

## Acceptance Criteria

1. Eri viestit eri tilanteisiin (aamu, ilta, kaikki tehty, streak milestone)
2. Viestit ovat positiivisia ja kannustavia
3. Ei syyllistäviä viestejä (esim. "Huonosti menee!")
4. Viestit vaihtuvat satunnaisesti (3-5 viestiä per konteksti)
5. Streak-milestoneissa (7, 30, 100 päivää) erikoisviesti

---

## Technical Notes

### Message Library

```typescript
// lib/messages.ts
export const messages = {
  morning: [
    'Hyvää huomenta! Tänään on uusi mahdollisuus.',
    'Uusi päivä, uudet mahdollisuudet!',
    'Aamun pienet askeleet vievät pitkälle.',
  ],
  evening: [
    'Illalla on hyvä hetki tarkistaa päivän edistyminen.',
    'Miten päiväsi on sujunut?',
    'Muista levätä hyvin!',
  ],
  allDone: [
    'Mahtavaa! Olet tehnyt kaikki tavat tänään!',
    'Täydellinen päivä! Olet sankari!',
    'Kaikki tehty! Nauti onnistumisesta.',
  ],
  streakMilestones: {
    7: 'Viikko putkeen! Upea suoritus!',
    30: 'Kuukausi! Olet todellinen mestari!',
    100: '100 päivää! Legendaarinen!',
  },
  encouragement: [
    'Jokainen askel vie lähemmäs tavoitetta.',
    'Pienet teot, suuret tulokset.',
    'Olet matkalla parempaan.',
  ],
};
```

### Time-based Selection

```typescript
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) {
    return getRandomMessage(messages.morning);
  } else if (hour < 18) {
    return getRandomMessage(messages.encouragement);
  } else {
    return getRandomMessage(messages.evening);
  }
}

function getRandomMessage(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

### Streak Milestone Check

```typescript
export function checkStreakMilestone(streak: number): string | null {
  const milestones = [7, 30, 100];
  if (milestones.includes(streak)) {
    return messages.streakMilestones[streak];
  }
  return null;
}
```

---

## Integration Points

- `WelcomeMessage.tsx` - uses time-based greeting
- `DailyProgress.tsx` - shows allDone messages
- `HabitItem.tsx` - shows milestone on toggle if streak hits milestone

---

## Definition of Done

- [ ] Time-based viestit toimivat
- [ ] Milestone-viestit näkyvät
- [ ] Ei negatiivisia viestejä
- [ ] Viestit vaihtuvat satunnaisesti

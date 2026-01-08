# Story 1.2: Basic Dashboard Layout

**Epic:** [Epic 1: Foundation](../epics/epic-1-foundation.md)
**Status:** Draft
**Priority:** P0
**Depends on:** Story 1.1

---

## User Story

**As a** user,
**I want** to see a clean main screen with today's date and a welcoming message,
**so that** I feel oriented when opening the app.

---

## Acceptance Criteria

1. Päänäkymä näyttää tämän päivän päivämäärän suomeksi (esim. "Tiistai 7.1.")
2. Tervetuloviesti näkyy (esim. "Hyvää päivää! Miten voit tänään?")
3. Layout on mobile-first ja responsiivinen
4. Värit ja typografia noudattavat branding-ohjeita
5. Sivun otsikko (title) on "Habit Tracker"

---

## Technical Notes

### Components to Create

- `src/components/dashboard/DateDisplay.tsx`
- `src/components/dashboard/WelcomeMessage.tsx`
- `src/components/layout/Container.tsx`

### Date Formatting

```typescript
// utils/date.ts
export function formatDateFi(date: Date): string {
  return date.toLocaleDateString('fi-FI', {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric'
  });
}
```

### Branding (Tailwind Config)

```javascript
// tailwind.config.js
colors: {
  primary: '#84a98c',    // Sage green
  background: '#f5f5f4', // Warm off-white
  text: '#1f2937',       // Dark gray
  accent: '#fb7185',     // Soft coral
}
```

---

## UI Mockup

```
┌────────────────────────────┐
│     Habit Tracker    [⚙️]  │
├────────────────────────────┤
│                            │
│   Tiistai 7.1.            │
│                            │
│   Hyvää päivää!           │
│   Miten voit tänään?      │
│                            │
│   ─────────────────────   │
│                            │
│   [Habits will go here]   │
│                            │
└────────────────────────────┘
```

---

## Definition of Done

- [ ] Päivämäärä näkyy suomeksi
- [ ] Tervetuloviesti näkyy
- [ ] Responsiivinen mobile-first
- [ ] Värit noudattavat brandia

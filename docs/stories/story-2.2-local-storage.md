# Story 2.2: Local Storage Persistence

**Epic:** [Epic 2: CRUD](../epics/epic-2-crud.md)
**Status:** Draft
**Priority:** P0
**Depends on:** Story 2.1

---

## User Story

**As a** user,
**I want** my habits to persist when I refresh the page,
**so that** I don't lose my data.

---

## Acceptance Criteria

1. Tavat tallentuvat localStorage:en (tai IndexedDB)
2. Sivun latautuessa tavat ladataan tallennustilasta
3. Tapojen toggle-tila (tehty/tekemättä) tallentuu
4. Data on päiväkohtaista (uusi päivä = tyhjä tila)
5. Tapa-lista säilyy päivitysten yli

---

## Technical Notes

### Storage Key

```typescript
const STORAGE_KEY = 'habit-tracker-data';
```

### Data Structure

```typescript
interface StoredData {
  habits: Habit[];
  logs: Record<string, Record<string, boolean>>; // habitId -> date -> completed
  version: number;
}
```

### Custom Hook

```typescript
// hooks/useLocalStorage.ts
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from localStorage on mount
  // Save to localStorage on change
  // Handle SSR (window undefined)
}
```

### Date-based Logs

```typescript
// Today's key
const today = new Date().toISOString().split('T')[0]; // "2026-01-07"

// Check if habit completed today
const isCompleted = logs[habitId]?.[today] ?? false;
```

---

## Implementation Notes

- Use `useEffect` to sync to localStorage after state changes
- Handle JSON parse errors gracefully
- Consider debouncing saves for performance
- SSR-safe: check for `typeof window !== 'undefined'`

---

## Definition of Done

- [ ] Data säilyy refreshin yli
- [ ] Toggle-tila tallentuu päiväkohtaisesti
- [ ] Tapa-lista säilyy
- [ ] Ei virheitä SSR:ssä

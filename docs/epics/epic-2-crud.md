# Epic 2: Developer Habit CRUD & Local Persistence

**Status:** Done
**Priority:** P0 - Core Feature

## Goal

Kehittäjä voi lisätä, muokata ja poistaa omia ammatillisen kehityksen tapojaan. Data tallentuu selaimen paikalliseen tallennustilaan, joten tavat säilyvät sivun päivityksen yli.

## Stories

- [Story 2.1: Add New Habit](../stories/story-2.1-add-habit.md)
- [Story 2.2: Local Storage Persistence](../stories/story-2.2-local-storage.md)
- [Story 2.3: Edit and Delete Habit](../stories/story-2.3-edit-delete.md)

## Acceptance Criteria (Epic Level)

- [x] Käyttäjä voi lisätä uusia kehittäjätapoja
- [x] Data säilyy sivun päivityksen yli
- [x] Tavat voi muokata ja poistaa
- [x] Validointi estää tyhjät nimet

## Technical Notes

- localStorage tai IndexedDB persistointiin
- Viittaa: `docs/architecture.md` osiot 4, 6

## Dependencies

- Epic 1 (Project Foundation)

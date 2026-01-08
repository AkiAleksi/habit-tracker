# Epic 4: Authentication & Cloud Sync

**Status:** Done
**Priority:** P1 - Data Safety

## Goal

Kehittäjä voi luoda tilin ja synkronoida datansa pilveen, jotta ammatillisen kehityksen tavat säilyvät laitteiden välillä.

## Stories

- [Story 4.1: Firebase Setup & Anonymous Auth](../stories/story-4.1-firebase-setup.md)
- [Story 4.2: Firestore Data Model & Sync](../stories/story-4.2-firestore-sync.md)
- [Story 4.3: Email Registration & Account Linking](../stories/story-4.3-registration.md)
- [Story 4.4: Settings Screen](../stories/story-4.4-settings.md)

## Acceptance Criteria (Epic Level)

- [x] Firebase integroitu ja anonymous auth toimii
- [x] Data synkronoituu Firestoreen
- [x] Käyttäjä voi rekisteröityä sähköpostilla
- [x] Settings-näkymä olemassa

## Technical Notes

- Firebase SDK v10+
- Security Rules: `docs/architecture.md` osio 7.2
- Viittaa: `docs/architecture.md` osiot 6, 7

## Dependencies

- Epic 2 (Habit CRUD & Persistence)

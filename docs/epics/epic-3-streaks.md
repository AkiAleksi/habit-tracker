# Epic 3: Developer Growth Streak Tracking & Progress

**Status:** Done
**Priority:** P1 - Enhanced UX

## Goal

Sovellus seuraa peräkkäisiä oppimispäiviä ja näyttää kehittäjälle motivoivaa dataa edistymisestä. Kehittäjälle suunnatut viestit tukevat ammatillisen kasvun motivaatiota.

## Stories

- [Story 3.1: Streak Counter per Habit](../stories/story-3.1-streak-counter.md)
- [Story 3.2: Daily Progress Summary](../stories/story-3.2-progress-summary.md)
- [Story 3.3: Developer Growth Messages](../stories/story-3.3-messages.md)

## Acceptance Criteria (Epic Level)

- [x] Jokaisella tavalla on streak-laskuri
- [x] Dashboard näyttää päivän kokonaisedistymisen
- [x] Kehittäjälle suunnatut kannustavat viestit
- [x] Streak-milestoneilla erikoisviestit

## Technical Notes

- Streak-logiikka: `utils/streak.ts`
- Viestit: `lib/messages.ts`
- Viittaa: `docs/architecture.md` osiot 4, 5

## Dependencies

- Epic 2 (Habit CRUD & Persistence)

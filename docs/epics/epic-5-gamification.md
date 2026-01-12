# Epic 5: Gamification & XP System

**Status:** Done
**Priority:** P1 - Engagement

## Goal

Lisää pelillistäminen motivoimaan kehittäjää jatkuvaan oppimiseen. XP-pisteet, tasot ja saavutukset tekevät edistymisestä näkyvää ja palkitsevaa.

## Stories

- [Story 5.1: XP & Level System](../stories/story-5.1-xp-levels.md)
- [Story 5.2: Achievements System](../stories/story-5.2-achievements.md)
- [Story 5.3: Stats Page](../stories/story-5.3-stats-page.md)
- [Story 5.4: Improved Login Visibility](../stories/story-5.4-login-visibility.md)

## Acceptance Criteria (Epic Level)

- [x] XP-pisteet kertyvät tapojen suorittamisesta
- [x] Streak-bonukset kasvattavat XP:tä
- [x] 12-tasoinen kehittäjäpolku (Noob → Legend)
- [x] 20+ saavutusta eri kategorioissa
- [x] Level-up ja achievement-ilmoitukset
- [x] Stats-sivu näyttää kaiken edistymisen
- [x] Kirjautuminen näkyvästi esillä

## Technical Notes

- GamificationContext hallitsee tilaa
- useGamification hook laskee XP:n ja saavutukset
- localStorage persistointi
- Viittaa: `src/lib/gamification.ts`

## Dependencies

- Epic 3 (Streak Tracking)
- Epic 4 (Authentication)

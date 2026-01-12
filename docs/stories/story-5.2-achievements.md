# Story 5.2: Achievements System

**Epic:** [Epic 5: Gamification](../epics/epic-5-gamification.md)
**Status:** Done
**Priority:** P1

## User Story

Kehittäjänä haluan ansaita saavutuksia eri tavoitteista, jotta saan lisämotivaatiota ja näen mitä olen saavuttanut.

## Acceptance Criteria

- [x] 20+ saavutusta eri kategorioissa
- [x] Saavutuksilla 4 harvinaisuustasoa (common, rare, epic, legendary)
- [x] Saavutus antaa XP-bonuksen
- [x] Achievement unlock -modal näkyy kun saavutus avataan
- [x] Lukitut saavutukset näkyvät himmennettynä

## Technical Details

### Saavutuskategoriat

**Ensimmäiset askeleet:**
- Hello World - Luo ensimmäinen tapa (+50 XP)
- First Commit - Suorita tapa ensimmäistä kertaa (+25 XP)

**Streak-saavutukset:**
- Warming Up - 3 päivän streak (+50 XP)
- On Fire - 7 päivän streak (+100 XP)
- Unstoppable - 14 päivän streak (+200 XP)
- Legendary Streak - 30 päivän streak (+500 XP)
- Centurion - 100 päivän streak (+1000 XP)

**Suoritusmäärät:**
- Getting Started - 10 suoritusta (+50 XP)
- Consistent - 50 suoritusta (+150 XP)
- Century - 100 suoritusta (+300 XP)
- Dedicated - 500 suoritusta (+750 XP)
- Master - 1000 suoritusta (+1500 XP)

**Täydelliset päivät:**
- Perfect Day - Suorita kaikki tavat (+50 XP)
- Perfect Week - 7 täydellistä päivää (+200 XP)
- Perfect Month - 30 täydellistä päivää (+500 XP)

**Tapojen määrä:**
- Triple Threat - 3 tapaa (+75 XP)
- High Five - 5 tapaa (+150 XP)

**Tasosaavutukset:**
- Developer Status - Taso 5 (+200 XP)
- Principal Engineer - Taso 10 (+500 XP)
- Legendary Status - Taso 12 (+1000 XP)

### Tiedostot

- `src/lib/gamification.ts` - Saavutusmäärittelyt
- `src/components/gamification/AchievementCard.tsx` - Saavutuskortti
- `src/components/gamification/AchievementUnlockModal.tsx` - Unlock-modal

## Definition of Done

- [x] Kaikki saavutukset määritelty
- [x] Saavutukset avautuvat oikein
- [x] Modal näkyy uudesta saavutuksesta
- [x] Harvinaisuusvärit toimivat

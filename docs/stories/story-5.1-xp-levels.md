# Story 5.1: XP & Level System

**Epic:** [Epic 5: Gamification](../epics/epic-5-gamification.md)
**Status:** Done
**Priority:** P1

## User Story

Kehittäjänä haluan ansaita XP-pisteitä tapojen suorittamisesta, jotta näen konkreettisesti edistymiseni ja motivoidun jatkamaan.

## Acceptance Criteria

- [x] Tavan suorittaminen antaa 10 XP
- [x] Streak-bonukset: +5 (3pv), +15 (7pv), +25 (14pv), +50 (30pv)
- [x] Uuden tavan luominen antaa 20 XP
- [x] 12 tasoa kehittäjäpolulla (Noob → Padawan → ... → Legend)
- [x] Level-up modal näkyy tason noustessa
- [x] XP-palkki näyttää edistymisen seuraavalle tasolle

## Technical Details

### Tasot

| Taso | Nimi | Min XP |
|------|------|--------|
| 1 | Noob | 0 |
| 2 | Padawan | 100 |
| 3 | Apprentice | 300 |
| 4 | Junior Dev | 600 |
| 5 | Developer | 1000 |
| 6 | Mid-Level | 1500 |
| 7 | Senior Dev | 2200 |
| 8 | Tech Lead | 3000 |
| 9 | Architect | 4000 |
| 10 | Principal | 5500 |
| 11 | 10x Dev | 7500 |
| 12 | Legend | 10000 |

### Tiedostot

- `src/lib/gamification.ts` - XP-laskenta ja tasomäärittelyt
- `src/hooks/useGamification.ts` - Tilan hallinta
- `src/contexts/GamificationContext.tsx` - Context provider
- `src/components/gamification/LevelUpModal.tsx` - Level-up ilmoitus
- `src/components/gamification/XPProgressBar.tsx` - XP-edistymispalkki
- `src/components/gamification/LevelBadge.tsx` - Taso-badge

## Definition of Done

- [x] XP kertyy oikein eri toiminnoista
- [x] Streak-bonukset toimivat
- [x] Level-up modal näkyy
- [x] Data persistoituu localStorageen

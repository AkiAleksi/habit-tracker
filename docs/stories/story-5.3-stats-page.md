# Story 5.3: Stats Page

**Epic:** [Epic 5: Gamification](../epics/epic-5-gamification.md)
**Status:** Done
**Priority:** P2

## User Story

Kehittäjänä haluan nähdä kaikki tilastoni yhdessä paikassa, jotta voin seurata kokonaisedistymistäni.

## Acceptance Criteria

- [x] /stats sivu näyttää kaikki tilastot
- [x] Nykyinen taso ja XP-edistyminen
- [x] Statistiikat (XP, streak, suoritukset, täydelliset päivät, tavat)
- [x] Tasoeteneminen - kaikki tasot ja saavutetut
- [x] Saavutukset - avatut ja lukitut erikseen
- [x] PlayerStatsCard dashboardissa linkkaa stats-sivulle

## Technical Details

### Näytettävät tiedot

**Level-kortti:**
- Nykyinen taso (ikoni, nimi, numero)
- Kokonais-XP
- XP-edistymispalkki seuraavalle tasolle

**Statistiikat:**
- Kokonais-XP
- Pisin streak
- Suoritusten määrä
- Täydelliset päivät
- Luotujen tapojen määrä

**Tasoeteneminen:**
- Lista kaikista 12 tasosta
- Nykyinen taso korostettu
- Saavutetut tasot merkitty

**Saavutukset:**
- Avatut saavutukset ylhäällä
- Lukitut saavutukset alla (himmennettynä)
- Laskuri: "X/Y saavutusta"

### Tiedostot

- `src/app/stats/page.tsx` - Stats-sivu
- `src/components/dashboard/PlayerStatsCard.tsx` - Dashboard-kortti
- `src/components/gamification/PlayerStats.tsx` - Tilastokomponentti

## Definition of Done

- [x] Stats-sivu toimii
- [x] Kaikki tilastot näkyvät oikein
- [x] Navigointi toimii molempiin suuntiin
- [x] Responsiivinen design

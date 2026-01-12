# Story 5.4: Improved Login Visibility

**Epic:** [Epic 5: Gamification](../epics/epic-5-gamification.md)
**Status:** Done
**Priority:** P2

## User Story

Kehittäjänä haluan kirjautumisen olevan selkeästi esillä, jotta ymmärrän helposti miten voin tallentaa edistymiseni.

## Acceptance Criteria

- [x] "Kirjaudu"-nappi näkyy headerissa anonyymeille käyttäjille
- [x] Kirjautuneille käyttäjille näkyy avatar (sähköpostin 1. kirjain)
- [x] AccountBanner etusivulla muistuttaa tilin luomisesta
- [x] Bannerin voi sulkea X-napilla
- [x] Bannerissa "Luo tili" ja "Kirjaudu" -napit

## Technical Details

### Header-muutokset

**Anonyymi käyttäjä:**
- Vihreä "Kirjaudu"-nappi käyttäjäikonilla
- Klikkaus avaa LoginModalin

**Kirjautunut käyttäjä:**
- Pyöreä avatar sähköpostin ensimmäisellä kirjaimella
- Klikkaus vie Settings-sivulle

### AccountBanner

- Näkyy dashboardissa anonyymeille käyttäjille
- Vihreä reunus ja tausta (primary-väri)
- Käyttäjäikoni vasemmalla
- "Tallenna edistymisesi" -otsikko
- Selitysteksti XP-pisteiden säilyttämisestä
- "Luo tili" (primary) ja "Kirjaudu" (secondary) napit
- X-nappi sulkemiseen (dismissed-tila)

### Tiedostot

- `src/components/layout/Header.tsx` - Päivitetty header
- `src/components/auth/AccountBanner.tsx` - Uusi bannerikomponentti
- `src/app/page.tsx` - Banner lisätty dashboardiin

## Definition of Done

- [x] Kirjaudu-nappi näkyy headerissa
- [x] Avatar näkyy kirjautuneille
- [x] AccountBanner toimii oikein
- [x] Modalit avautuvat oikein
- [x] Bannerin voi sulkea

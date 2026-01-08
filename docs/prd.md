# DevHabit - Product Requirements Document (PRD)

**Versio:** 2.0
**Päivämäärä:** 8.1.2026
**Laatija:** John (Product Manager)
**Lähde:** Project Brief v2.0 (Developer Focus Pivot)

---

## Goals and Background Context

### Goals

- Ohjelmistokehittäjät voivat seurata ammatillisen kehityksen tapojaan yhdellä napautuksella
- Sovellus säilyttää 40%+ käyttäjistä aktiivisina 30 päivän jälkeen
- Päivittäinen kirjausaika pysyy alle 30 sekunnissa
- Käyttäjäkokemus puhuttelee kehittäjiä: tekninen mutta ystävällinen
- MVP toimii ilman rekisteröitymispakkoa
- Valmiit esimerkkitavat auttavat kehittäjiä alkuun

### Background Context

Ohjelmistokehittäjät tietävät jatkuvan oppimisen tärkeyden, mutta arjen kiireet syövät kehitysajan. Yleiset habit trackerit eivät ymmärrä kehittäjän kontekstia, ja oppimisalustat (Udemy, Pluralsight) tarjoavat sisältöä, eivät tapojen rakentamista.

DevHabit yhdistää päivittäiset mikro-oppimiset pitkän aikavälin ammatilliseen kasvuun. Filosofia "Grow 1% every day" ohjaa kaikkia päätöksiä — pienet päivittäiset teot kumuloituvat merkittäväksi kasvuksi.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 7.1.2026 | 1.0 | Initial PRD created from Project Brief | John (PM) |
| 8.1.2026 | 2.0 | Pivot to developer professional growth focus | John (PM) |

---

## Requirements

### Functional Requirements

- **FR1:** Käyttäjä voi lisätä uuden tavan antamalla sille nimen
- **FR2:** Käyttäjä voi merkitä tavan tehdyksi yhdellä napautuksella
- **FR3:** Käyttäjä näkee kaikki päivän tavat yhdellä näytöllä
- **FR4:** Sovellus näyttää peräkkäisten päivien streak-laskurin kullekin tavalle
- **FR5:** Käyttäjä voi poistaa tavan
- **FR6:** Käyttäjä voi muokata tavan nimeä
- **FR7:** Sovellus tallentaa datan paikallisesti ilman rekisteröitymistä
- **FR8:** Käyttäjä voi rekisteröityä synkronoidakseen datan pilven
- **FR9:** Sovellus näyttää päivämäärän ja kannustavan viestin
- **FR10:** Sovellus näyttää yhteenvedon päivän edistymisestä (x/y tapaa tehty)

### Non-Functional Requirements

- **NFR1:** Ensimmäinen lataus < 3 sekuntia 3G-yhteydellä
- **NFR2:** Interaktiot (napautukset) reagoivat < 100ms
- **NFR3:** Sovellus toimii offline-tilassa (PWA)
- **NFR4:** Firebase free tier -rajoissa pysyminen
- **NFR5:** Responsiivinen design (mobile-first)
- **NFR6:** Tukee moderneita selaimia (Chrome, Safari, Firefox, Edge)
- **NFR7:** Accessibility: WCAG AA -taso
- **NFR8:** Turvallinen autentikointi Firebase Auth:lla

---

## User Interface Design Goals

### Overall UX Vision

Tekninen mutta ystävällinen. Kehittäjä tuntee, että sovellus "ymmärtää häntä". Clean ja moderni UI, joka resonoi kehittäjäestetiikan kanssa (dark mode ready, monospace-aksentit). Jokainen interaktio on nopea ja tarkoituksenmukainen.

### Key Interaction Paradigms

- **One-tap completion:** Tapaa napautetaan → tila vaihtuu → visuaalinen palaute
- **Swipe actions:** Vasemmalle pyyhkäisy → muokkaus/poisto -valikko
- **Pull-to-refresh:** Päivitä data pilvestä
- **Progressive disclosure:** Vain oleelliset elementit näkyvissä

### Core Screens and Views

1. **Main Dashboard** - Päivän kehitystavat, edistyminen, streak-tiedot
2. **Add Habit Modal** - Yksinkertainen lomake + valmiit esimerkit
3. **Settings Screen** - Käyttäjäasetukset, rekisteröityminen, data sync
4. **History/Stats** - Viikon/kuukauden edistyminen (MVP+)

### Accessibility

WCAG AA -taso. Riittävät kontrastit, screen reader -tuki, kosketusalueet min 44x44px.

### Branding

- **Väripaletti:** Moderni kehittäjätyyli (tummemmat sävyt, vihreät/siniset aksentit kuten GitHub/VS Code)
- **Typografia:** Clean sans-serif (Inter), monospace koodiaksenteissa (JetBrains Mono)
- **Ikonigrafia:** Developer-friendly ikonit (koodisymbolit, kirjat, aivosolmut)
- **Tone of voice:** Tekninen mutta kannustava, puhuttelee kehittäjää

### Target Device and Platforms

Web Responsive (PWA), mobile-first. Ensisijainen kokemus mobiililla, mutta toimii myös desktopilla. Kehittäjät käyttävät myös työpöydällä.

---

## Technical Assumptions

### Repository Structure

**Monorepo** - Next.js full-stack sovellus yhdessä repositoriossa. Yksinkertaisin rakenne solo-kehittäjälle.

### Service Architecture

**Serverless Monolith** - Next.js API routes + Firebase:
- Frontend: Next.js (React) + Tailwind CSS
- Backend: Next.js API Routes + Firebase Functions
- Database: Firestore (NoSQL, realtime sync)
- Auth: Firebase Authentication (anonymous + email)
- Hosting: Firebase Hosting tai Vercel

### Testing Requirements

**Unit + Integration:**
- Unit tests: Vitest (komponentit, utility-funktiot)
- Integration tests: Testing Library (käyttäjäinteraktiot)
- E2E: Playwright (kriittiset polut MVP:n jälkeen)
- Coverage target: 70%+ unit, kriittiset polut E2E

### Additional Technical Assumptions

- TypeScript koko projektissa (type safety)
- ESLint + Prettier koodin laadun varmistamiseen
- Husky pre-commit hooks
- GitHub Actions CI/CD
- PWA Service Worker offline-tukeen
- Local-first data (IndexedDB) → Firestore sync

---

## Epic List

### Epic 1: Project Foundation & Basic Habit Display
Perusta projekti-infrastruktuuri ja näytä kehittäjän esimerkkitavat yhden näytön dashboardilla.

### Epic 2: Habit CRUD & Local Persistence
Toteuta tapojen lisääminen, muokkaaminen, poistaminen ja paikallinen tallennus. Sisältää valmiit kehittäjätapa-ehdotukset.

### Epic 3: Streak Tracking & Progress
Lisää streak-seuranta ja päivittäisen edistymisen visualisointi kehittäjän kasvuun keskittyen.

### Epic 4: Authentication & Cloud Sync
Toteuta käyttäjän rekisteröityminen ja datan synkronointi Firestoren kanssa.

---

## Epic 1: Project Foundation & Basic Habit Display

**Goal:** Pystytä toimiva Next.js-projekti modernilla työkaluketjulla ja näytä yksinkertainen dashboard, jossa staattiset esimerkkitavat. Tämä luo pohjan kaikelle jatkokehitykselle.

### Story 1.1: Project Setup & Dev Environment

**As a** developer,
**I want** a configured Next.js project with TypeScript, Tailwind, and linting,
**so that** I can start building features with best practices from day one.

**Acceptance Criteria:**
1. Next.js 14+ projekti luotu TypeScript-tuella
2. Tailwind CSS konfiguroitu ja toimii
3. ESLint + Prettier konfiguroitu
4. Perus folder-struktuuri luotu (app, components, lib, types)
5. `npm run dev` käynnistää kehitysserverin
6. `npm run build` rakentaa tuotantoversion ilman virheitä
7. README.md sisältää projektin käynnistysohjeet

### Story 1.2: Basic Dashboard Layout

**As a** developer,
**I want** to see a clean main screen with today's date and a developer-focused welcoming message,
**so that** I feel motivated to grow my skills today.

**Acceptance Criteria:**
1. Päänäkymä näyttää tämän päivän päivämäärän suomeksi (esim. "Tiistai 7.1.")
2. Kehittäjäviesti näkyy (esim. "Kasva 1% tänään" tai "Mitä opit tänään?")
3. Layout on mobile-first ja responsiivinen
4. Värit ja typografia noudattavat developer-branding-ohjeita
5. Sivun otsikko (title) on "DevHabit"

### Story 1.3: Static Habit List Display

**As a** developer,
**I want** to see a list of example developer growth habits on the dashboard,
**so that** I understand what kind of habits to track.

**Acceptance Criteria:**
1. Dashboard näyttää 3-5 kehittäjän esimerkkitapaa:
   - "📚 Lue tekninen artikkeli (15 min)"
   - "💻 Koodaa sivuprojektia (30 min)"
   - "🧠 Opiskele uutta teknologiaa"
   - "✍️ Kirjoita TIL / blogipostaus"
   - "🎯 Harjoittele algoritmeja"
2. Jokainen tapa näyttää nimen ja ympyrä/checkbox-elementin
3. Tavat on järjestetty siistiin listaan
4. Yksi napautus "toggle" -efekti toimii (visuaalinen, ei vielä persistointi)
5. Completed-tila näkyy visuaalisesti (esim. yliviivaus, värinvaihto)
6. Kosketusalueet ovat riittävän suuret (min 44x44px)

---

## Epic 2: Habit CRUD & Local Persistence

**Goal:** Käyttäjä voi lisätä, muokata ja poistaa omia tapojaan. Data tallentuu selaimen paikalliseen tallennustilaan, joten tavat säilyvät sivun päivityksen yli.

### Story 2.1: Add New Habit

**As a** user,
**I want** to add a new habit with a name,
**so that** I can track my personal goals.

**Acceptance Criteria:**
1. "Lisää tapa" -nappi näkyy dashboardilla
2. Nappi avaa modaalin/bottom sheetin
3. Modaalissa on tekstikenttä tavan nimelle
4. "Tallenna" luo uuden tavan ja sulkee modaalin
5. Uusi tapa ilmestyy listaan välittömästi
6. Tyhjää nimeä ei voi tallentaa (validointi)
7. Modaalin voi sulkea peruuttamalla

### Story 2.2: Local Storage Persistence

**As a** user,
**I want** my habits to persist when I refresh the page,
**so that** I don't lose my data.

**Acceptance Criteria:**
1. Tavat tallentuvat localStorage:en (tai IndexedDB)
2. Sivun latautuessa tavat ladataan tallennustilasta
3. Tapojen toggle-tila (tehty/tekemättä) tallentuu
4. Data on päiväkohtaista (uusi päivä = tyhjä tila)
5. Tapa-lista säilyy päivitysten yli

### Story 2.3: Edit and Delete Habit

**As a** user,
**I want** to edit or delete existing habits,
**so that** I can manage my habit list over time.

**Acceptance Criteria:**
1. Swipe left (tai long press) näyttää muokkaus/poisto-valinnat
2. "Muokkaa" avaa modaalin esitäytetyllä nimellä
3. Nimen muutos tallentuu ja näkyy listassa
4. "Poista" pyytää vahvistuksen
5. Vahvistuksen jälkeen tapa poistetaan pysyvästi
6. Poisto päivittää tallennustilan välittömästi

---

## Epic 3: Streak Tracking & Progress

**Goal:** Sovellus seuraa peräkkäisiä päiviä ja näyttää käyttäjälle motivoivaa dataa edistymisestä.

### Story 3.1: Streak Counter per Habit

**As a** user,
**I want** to see my streak count for each habit,
**so that** I feel motivated to maintain consistency.

**Acceptance Criteria:**
1. Jokaisen tavan vieressä näkyy streak-luku (esim. "5 päivää")
2. Streak kasvaa kun tapa merkitään tehdyksi peräkkäisinä päivinä
3. Streak nollautuu jos päivä jää väliin
4. Streak-data tallentuu paikalliseen tallennustilaan
5. Uusilla tavoilla streak alkaa nollasta

### Story 3.2: Daily Progress Summary

**As a** user,
**I want** to see today's overall progress at a glance,
**so that** I know how well I'm doing.

**Acceptance Criteria:**
1. Dashboard näyttää "x/y tapaa tehty" yhteenvedon
2. Visuaalinen progress bar tai prosentti
3. Kun kaikki tehty, näkyy juhlaviesti (esim. "Mahtavaa! Kaikki tehty!")
4. Viesti on kannustava myös keskeneräisenä
5. Progress päivittyy reaaliaikaisesti toggle-napauksilla

### Story 3.3: Developer Growth Messages System

**As a** developer,
**I want** the app to show encouraging developer-focused messages,
**so that** I feel motivated to continue my professional growth.

**Acceptance Criteria:**
1. Eri viestit eri tilanteisiin:
   - Aamu: "Uusi päivä, uusi mahdollisuus oppia"
   - Ilta: "Hyvää työtä tänään! Pienikin edistys vie eteenpäin."
   - Kaikki tehty: "100% — Olet todellinen growth hacker!"
   - Streak milestone: "7 päivän putki! Johdonmukaisuus > intensiteetti"
2. Viestit puhuttelevat kehittäjiä:
   - "Jokainen senior dev oli joskus junior"
   - "Tämän päivän oppiminen on huomisen tuottavuus"
   - "Compound interest toimii myös osaamisessa"
3. Ei syyllistäviä viestejä (esim. "Huonosti menee!")
4. Viestit vaihtuvat satunnaisesti (3-5 viestiä per konteksti)
5. Streak-milestoneissa (7, 30, 100 päivää) erikoisviesti

---

## Epic 4: Authentication & Cloud Sync

**Goal:** Käyttäjä voi luoda tilin ja synkronoida datansa pilveen, jotta tavat säilyvät laitteiden välillä.

### Story 4.1: Firebase Setup & Anonymous Auth

**As a** developer,
**I want** Firebase configured with anonymous authentication,
**so that** users can start using the app immediately.

**Acceptance Criteria:**
1. Firebase-projekti luotu ja konfiguroitu
2. Firebase SDK integroitu Next.js-projektiin
3. Anonymous auth toimii automaattisesti ensimmäisellä käynnistyksellä
4. Käyttäjälle luodaan uniikki ID
5. Environment variables konfiguroitu turvallisesti

### Story 4.2: Firestore Data Model & Sync

**As a** user,
**I want** my habits to sync to the cloud,
**so that** I don't lose them if I clear my browser data.

**Acceptance Criteria:**
1. Firestore-kokoelmarakenne: users/{userId}/habits/{habitId}
2. Paikallinen data synkronoidaan Firestoreen
3. Firestore-data ladataan kun sovellus käynnistyy
4. Offline-toiminta: muutokset synkronoidaan kun yhteys palaa
5. Security rules estävät pääsyn muiden käyttäjien dataan

### Story 4.3: Email Registration & Account Linking

**As a** user,
**I want** to register with my email,
**so that** I can access my habits from any device.

**Acceptance Criteria:**
1. Settings-näkymässä "Luo tili" -nappi
2. Rekisteröitymislomake: email + salasana
3. Anonymous-tili linkitetään email-tiliin (data säilyy)
4. Kirjautuminen toimii toiselta laitteelta
5. "Kirjaudu ulos" -toiminto
6. Salasanan validointi (min 8 merkkiä)

### Story 4.4: Settings Screen

**As a** user,
**I want** a settings screen to manage my account,
**so that** I have control over my app experience.

**Acceptance Criteria:**
1. Settings-linkki dashboardilla (hamburger menu tai ikoni)
2. Settings näyttää käyttäjän tilan (anonymous vs. rekisteröitynyt)
3. Rekisteröityneelle: email näkyy, logout-nappi
4. Anonymous: "Luo tili" -nappi
5. Versionnumero näkyy sivun alalaidassa
6. Takaisin-navigointi dashboardille

---

## Checklist Results Report

*To be completed after PRD review with PM Checklist*

---

## Next Steps

### UX Expert Prompt

> Luo DevHabit-sovellukselle Front End Spec perustuen tähän PRD:hen. Keskity mobile-first PWA-designiin, kehittäjäystävälliseen brändäykseen (dark mode, moderni), ja developer growth -fokukseen. Tech stack: Next.js + Tailwind CSS.

### Architect Prompt

> Luo DevHabit-sovellukselle tekninen arkkitehtuuridokumentti perustuen tähän PRD:hen. Stack: Next.js 14+, TypeScript, Tailwind CSS, Firebase (Auth, Firestore, Hosting). Fokus: PWA, offline-first, local-first data model.

---

*Dokumentti päivitetty BMAD-metodilla — v2.0 (Developer Focus Pivot)*

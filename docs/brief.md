# Project Brief: DevHabit — Developer Growth Tracker

**Versio:** 2.0
**Päivämäärä:** 8.1.2026
**Laatija:** Mary (Business Analyst)
**Lähde:** Pivot from general habit tracker, 8.1.2026

---

## Executive Summary

**DevHabit** on ohjelmistokehittäjille suunnattu tapaseuranta-sovellus, joka keskittyy ammatilliseen kehitykseen. Sovellus auttaa kehittäjiä rakentamaan johdonmukaisia oppimis- ja kehitystapoja, jotka edistävät uraa pitkällä aikavälillä.

**Kohderyhmä:** Ohjelmistokehittäjät (junior → senior), jotka haluavat systemaattisesti kehittää osaamistaan.

**Arvolupaus:** "Grow 1% every day" — pienet päivittäiset teot, jotka kumuloituvat merkittäväksi ammatilliseksi kasvuksi.

**Tech Stack:** React/Next.js, Firebase (Functions, Firestore, Auth, Hosting), Tailwind CSS

---

## Problem Statement

### Nykytila ja kipupisteet
Ohjelmistokehittäjät tietävät, että jatkuva oppiminen on välttämätöntä, mutta **arjen kiireet syövät kehitysajan**. Projekti-deadline, päivittäinen työ ja väsymys johtavat siihen, että ammatillinen kehitys jää "huomiselle".

### Ongelman vaikutus
- Kehittäjät tuntevat jäävänsä jälkeen nopeasti muuttuvassa alassa
- Impostor syndrome vahvistuu kun muut näyttävät edistyvän
- Ura stagnoituu ilman systemaattista osaamisen kehittämistä
- Burnout-riski kasvaa kun työ on ainoa "oppiminen"

### Miksi nykyiset ratkaisut epäonnistuvat
- **Yleiset habit trackerit** eivät ymmärrä kehittäjän kontekstia
- **Oppimisalustat** (Udemy, Pluralsight) tarjoavat sisältöä, eivät tapojen rakentamista
- **GitHub contributions** mittaavat työtä, eivät oppimista
- Ei ole työkalua joka yhdistää päivittäiset mikro-oppimiset pitkän aikavälin kasvuun

### Miksi nyt?
Teknologia-ala muuttuu nopeammin kuin koskaan (AI, uudet frameworkit). Kehittäjät tarvitsevat systemaattisen tavan pysyä mukana ilman burnoutia.

---

## Proposed Solution

### Ydinratkaisu
**DevHabit** on kehittäjille räätälöity päivittäinen kasvutyökalu. Seuraa ammatillisen kehityksen tapoja: oppiminen, lukeminen, projektit, verkostoituminen. Yhden näytön käyttöliittymä, joka sopii kehittäjän workflowiin.

### Erottautumistekijät

| Yleiset habit trackerit | DevHabit |
|-------------------------|----------|
| Geneeriset tavat | Kehittäjäspesifit kategoriat |
| Motivaatio: "ole terveempi" | Motivaatio: "kasva ammatillisesti" |
| Ei ymmärrä kontekstia | Ymmärtää kehittäjän arjen |

### Esimerkkitapoja
- 📚 Lue tekninen artikkeli/dokumentaatio (15 min)
- 💻 Koodaa sivuprojektia (30 min)
- 🧠 Opiskele uutta teknologiaa (20 min)
- ✍️ Kirjoita blogipostaus/TIL
- 🔧 Kontribuoi open sourceen
- 📖 Lue teknistä kirjaa (20 sivua)
- 🤝 Verkostoidu (meetup, Twitter, LinkedIn)
- 🎯 Harjoittele algoritmeja/LeetCode

### Miksi tämä toimii
1. **Kehittäjäfokus** — kategoriat ja viestit puhuvat kehittäjän kieltä
2. **Mikro-oppiminen** — pienet päivittäiset teot, ei massiivisia tavoitteita
3. **Streak-motivaatio** — näe johdonmukaisuutesi kasvu ajan myötä
4. **Ei syyllistämistä** — huonot päivät ovat osa matkaa

---

## Target Users

### Primary: Mid-level kehittäjä (3-7v kokemus)
- **Profiili:** 25-35v, vakituisessa työssä, haluaa kasvaa senioriksi
- **Haaste:** Työ vie kaiken ajan, oma kehitys jää
- **Prioriteettitavat:** Uusien teknologioiden oppiminen, system design, soft skills
- **Käyttöaika:** Aamulla ennen työtä tai illalla, max 1 min
- **Deal-breaker:** Liian monimutkainen tai "corporate"-tuntuinen
- **Tarve:** Nähdä konkreettinen edistyminen ajan myötä

### Secondary: Junior kehittäjä (0-3v kokemus)
- **Profiili:** 20-28v, uransa alussa, innokas oppimaan
- **Haaste:** Ei tiedä mitä opiskella, overwhelmed valinnoista
- **Prioriteettitavat:** Perusteet, algoritmit, ensimmäinen kieli syvälle
- **Tarve:** Ohjaus ja struktuuri oppimiseen
- **Hook:** Näkee edistyvänsä kohti "oikean kehittäjän" tasoa

### Tertiary: Senior/Lead kehittäjä (7+ v kokemus)
- **Profiili:** 30-45v, kokeneempi, ehkä johtamisvastuuta
- **Haaste:** Tekninen osaaminen ruostuu kun fokus siirtyy muualle
- **Prioriteettitavat:** Pysyä ajantasalla, mentorointi, kirjoittaminen
- **Tarve:** Yksinkertainen tapa pitää yllä teknistä terävyyttä

---

## Goals & Success Metrics

### Business Objectives
- Käyttäjäretentio: 40% aktiivisia päivänä 30
- Orgaaninen kasvu kehittäjäyhteisöissä (Twitter/X, Reddit, dev.to)
- Potentiaalinen premium-taso myöhemmin

### User Success Metrics
- Päivittäinen kirjausaika < 30 sekuntia
- Käyttäjät kokevat kehittyvänsä ammatillisesti 30 päivän jälkeen
- Oppimistuntien kasvu verrattuna ennen sovellusta

### KPIs
- **DAU/MAU ratio:** > 50% (korkea sitoutuminen)
- **Streak recovery rate:** Käyttäjät palaavat katkon jälkeen
- **Learning hours/week:** Keskimääräinen oppimisaika viikossa
- **Habit completion rate:** Suoritusprosentti kehittäjätavoissa

---

## MVP Scope

### Core Features (Must Have)

- **One-Tap Logging:** Yksi napautus merkitsee tavan tehdyksi
- **Single-Screen Design:** Kaikki päivän kehitystavat yhdellä näytöllä
- **Developer-Focused Messaging:** Viestit puhuvat kehittäjän kieltä
- **No Account Required:** Aloita heti, rekisteröidy myöhemmin
- **Basic Streak Tracking:** Näytä peräkkäiset päivät
- **Preset Developer Habits:** Valmiit esimerkkitavat kehittäjille

### Out of Scope for MVP
- GitHub/GitLab integraatio
- Oppimispolut (learning paths)
- AI-pohjaiset suositukset
- Tiimi/organisaatio-ominaisuudet
- Sosiaalinen jakaminen
- Statistiikka-dashboard
- Kalenterintegraatio

### MVP Success Criteria
- Käyttäjä voi lisätä kehittäjätavan ja merkitä sen tehdyksi < 10 sekunnissa
- Sovellus sisältää relevantteja esimerkkitapoja kehittäjille
- Viestit resonoivat kehittäjäyleisön kanssa

---

## Post-MVP Vision

### Phase 2 Features
- **Growth Score:** Kokonaisvaltainen kehityspisteytys (oppiminen + projektit + jakaminen)
- **Learning Paths:** Valmiit polut (esim. "Backend → Fullstack", "Junior → Senior")
- **GitHub Integration:** Yhdistä kontribuutiot ja oppiminen

### Long-term Vision
- Kehittäjän henkilökohtainen kasvuassistentti
- AI-pohjaiset suositukset: "Olet opiskellut Reactia, kokeile Next.js seuraavaksi"
- Yhteisö-ominaisuudet: jaa oppimispolkuja

### Expansion Opportunities
- Premium-taso: edistynyt analytiikka, oppimispolut
- Teams-versio: tiimin kehityksen seuranta
- Integraatiot: Notion, Obsidian, Anki

---

## Technical Considerations

### Platform Requirements
- **Target Platforms:** Web (PWA), myöhemmin iOS/Android
- **Browser Support:** Modernit selaimet (Chrome, Safari, Firefox, Edge)
- **Performance:** Ensimmäinen lataus < 3s, interaktiot < 100ms

### Technology Preferences
- **Frontend:** Next.js + React
- **Backend:** Firebase Functions (serverless)
- **Database:** Firestore (NoSQL, realtime)
- **Auth:** Firebase Authentication
- **Hosting:** Firebase Hosting
- **Styling:** Tailwind CSS

### Architecture Considerations
- **Repository:** Monorepo (Next.js full-stack)
- **Offline Support:** PWA Service Worker for offline logging
- **Data Model:** User → Habits → Daily Logs
- **Security:** Firebase Security Rules, anonymous auth first

---

## Constraints & Assumptions

### Constraints
- **Budget:** Ilmainen (Firebase free tier, personal project)
- **Resources:** Solo developer
- **Technical:** Firebase ekosysteemi, web-first

### Key Assumptions
- Käyttäjät haluavat yksinkertaisuutta monimutkaisuuden sijaan
- Yksi näyttö riittää useimmille käyttäjille (< 10 tapaa)
- Tukeva sävy toimii paremmin kuin syyllistäminen
- PWA riittää MVP:lle, natiivisovellus ei välttämätön

---

## Risks & Open Questions

### Key Risks
- **Liian niche?** Pelkästään kehittäjille voi rajoittaa käyttäjäkuntaa
- **Kilpailu:** Muut developer productivity -työkalut
- **Mittaaminen:** Miten todistaa, että sovellus oikeasti auttaa ammatillisessa kasvussa?
- **Engagement:** Miten pitää kehittäjät sitoutuneina pitkällä aikavälillä?

### Open Questions
- Mitkä ovat tärkeimmät kehittäjätavat joita seurata?
- Pitäisikö olla valmiita "oppimispolkuja" eri uratasoille?
- Miten GitHub/GitLab integraatio voisi toimia?
- Miten mitata "oppiminen" vs. "tekeminen"?

### Areas Needing Further Research
- Kehittäjäyhteisön palaute (Reddit, Twitter, dev.to)
- Kilpailija-analyysi (WakaTime, Polywork, daily.dev)
- Kehittäjien oppimistottumukset ja kipupisteet

---

## Next Steps

1. **PM:** Päivitä PRD vastaamaan uutta kehittäjäfokusta
2. **Architect:** Tarkista arkkitehtuuri — tarvitaanko muutoksia?
3. **PO:** Päivitä epicet ja tarinat uuteen fokukseen
4. **Dev:** Päivitä UI-viestit ja esimerkkitavat koodiin

---

*Dokumentti päivitetty BMAD-metodilla — v2.0 (Developer Focus Pivot)*

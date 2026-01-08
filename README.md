# DevHabit — Developer Growth Tracker

Ohjelmistokehittäjille suunnattu tapaseuranta-sovellus ammatillisen kehityksen tueksi.

**Filosofia:** "Grow 1% every day" — pienet päivittäiset teot, jotka kumuloituvat merkittäväksi ammatilliseksi kasvuksi.

## Tech Stack

- **Frontend:** Next.js 14+ (React)
- **Styling:** Tailwind CSS
- **Backend:** Firebase Functions
- **Database:** Firestore
- **Auth:** Firebase Authentication
- **Hosting:** Firebase Hosting

## Kehitysympäristö

### Vaatimukset

- Node.js 18+
- npm 9+

### Asennus

```bash
# Asenna riippuvuudet
npm install

# Kopioi ympäristömuuttujat
cp .env.example .env.local
# Täytä Firebase-tiedot .env.local -tiedostoon
```

### Käynnistys

```bash
# Kehityspalvelin
npm run dev

# Tuotantorakennelma
npm run build

# Tyypintarkistus
npm run type-check

# Linting
npm run lint
```

Avaa [http://localhost:3000](http://localhost:3000) selaimessa.

## Projektirakenne

```
src/
├── app/              # Next.js App Router
├── components/       # React-komponentit
│   ├── ui/          # Yleiset UI-komponentit
│   ├── habits/      # Tapa-komponentit
│   ├── layout/      # Layout-komponentit
│   └── dashboard/   # Dashboard-komponentit
├── contexts/        # React Context
├── hooks/           # Custom hooks
├── lib/             # Konfiguraatiot
├── types/           # TypeScript-tyypit
└── utils/           # Apufunktiot
```

## Dokumentaatio

- [Project Brief](./docs/brief.md)
- [PRD](./docs/prd.md)
- [Architecture](./docs/architecture.md)
- [Epics](./docs/epics/)
- [Stories](./docs/stories/)

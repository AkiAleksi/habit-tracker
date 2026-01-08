# Story 1.1: Project Setup & Dev Environment

**Epic:** [Epic 1: Foundation](../epics/epic-1-foundation.md)
**Status:** Draft
**Priority:** P0

---

## User Story

**As a** developer,
**I want** a configured Next.js project with TypeScript, Tailwind, and linting,
**so that** I can start building features with best practices from day one.

---

## Acceptance Criteria

1. Next.js 14+ projekti luotu TypeScript-tuella
2. Tailwind CSS konfiguroitu ja toimii
3. ESLint + Prettier konfiguroitu
4. Perus folder-struktuuri luotu (app, components, lib, types)
5. `npm run dev` käynnistää kehitysserverin
6. `npm run build` rakentaa tuotantoversion ilman virheitä
7. README.md sisältää projektin käynnistysohjeet

---

## Technical Notes

### Folder Structure

```
src/
├── app/
├── components/
│   ├── ui/
│   ├── habits/
│   ├── layout/
│   └── dashboard/
├── contexts/
├── hooks/
├── lib/
├── types/
└── utils/
```

### Commands to Set Up

```bash
npx create-next-app@latest habit-tracker --typescript --tailwind --eslint --app --src-dir
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

---

## Definition of Done

- [ ] Projekti käynnistyy `npm run dev`
- [ ] Build onnistuu ilman virheitä
- [ ] Folder-struktuuri vastaa arkkitehtuuria
- [ ] Linting toimii

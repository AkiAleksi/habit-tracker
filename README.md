# DevHabit

**Build better habits. Level up your career.**

A gamified habit tracking app designed for software developers who want to grow 1% every day. Track your learning, coding practices, and professional development with XP, achievements, and streak tracking.

**[Live Demo](https://habit-tracker-khaki-alpha.vercel.app)**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange?logo=firebase)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## Features

- **Habit Tracking** — Create custom developer habits with daily check-ins
- **Streak System** — Track consecutive days and build momentum
- **XP & Levels** — Earn experience points and progress through 12 developer ranks (Noob → Legend)
- **Achievements** — Unlock 20+ achievements across multiple categories
- **Cloud Sync** — Firebase-powered sync across all your devices
- **Authentication** — Email/password and Google sign-in support
- **Offline-First** — Works without internet, syncs when connected
- **Mobile Responsive** — Optimized for desktop and mobile

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| State | React Context + Custom Hooks |
| Deployment | Vercel / Firebase Hosting |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Firebase project with Firestore and Authentication enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/AkiAleksi/habit-tracker.git
cd habit-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file with your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Development

```bash
# Start development server
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Production build
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx        # Dashboard (main view)
│   ├── stats/          # Statistics & achievements
│   ├── history/        # Habit completion history
│   └── settings/       # User settings
├── components/
│   ├── auth/           # Authentication modals
│   ├── dashboard/      # Dashboard widgets
│   ├── gamification/   # XP, levels, achievements
│   ├── habits/         # Habit CRUD components
│   └── ui/             # Reusable UI primitives
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── lib/                # Firebase config, utilities
├── types/              # TypeScript definitions
└── utils/              # Helper functions
```

## Architecture Highlights

- **Optimistic UI** — Instant feedback with background sync
- **Anonymous-to-Registered Flow** — Users start anonymously, data persists when they sign up
- **Streak Calculation** — Timezone-aware streak logic with grace period handling
- **XP Formula** — Base XP + streak multipliers for balanced progression

## License

MIT

---

Built with Next.js and Firebase.

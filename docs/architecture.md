# DevHabit - Architecture Document

**Versio:** 2.0
**Päivämäärä:** 8.1.2026
**Laatija:** Architect
**Lähde:** PRD v2.0 (Developer Focus Pivot)

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 7.1.2026 | 1.0 | Initial architecture | Architect |
| 8.1.2026 | 2.0 | Updated for developer focus pivot | Architect |

---

## 1. System Overview

### 1.1 Architecture Style

**Serverless Monolith** - Next.js full-stack sovellus, joka hyödyntää Firebase-palveluita backendissä. Yksinkertainen, skaalautuva ja sopiva solo-kehittäjälle.

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│  ┌─────────────────────────────────────────────────┐   │
│  │              Next.js App (React)                 │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────────┐   │   │
│  │  │Dashboard│ │Settings │ │ Service Worker  │   │   │
│  │  └─────────┘ └─────────┘ └─────────────────┘   │   │
│  │                    │                            │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │           Local Storage / IndexedDB      │   │   │
│  │  └─────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                     Firebase Cloud                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐ │
│  │  Firebase   │  │  Firestore  │  │ Firebase        │ │
│  │  Auth       │  │  Database   │  │ Hosting         │ │
│  └─────────────┘  └─────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 14+ (App Router) | Full-stack, SSR, excellent DX |
| Styling | Tailwind CSS | Utility-first, rapid development |
| State | React Context + useState | Simple app, no Redux needed |
| Auth | Firebase Auth | Anonymous + email, easy setup |
| Database | Firestore | Realtime sync, offline support |
| Hosting | Vercel or Firebase | Zero-config deployment |
| PWA | next-pwa | Offline support, installable |

---

## 2. Technology Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| Framework | Next.js | 14.x | Full-stack React framework |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| UI Components | Custom + Headless UI | 2.x | Accessible components |
| State | React Context | - | Global state (user, habits) |
| Forms | React Hook Form | 7.x | Form handling |
| Backend | Firebase | 10.x | Auth, Firestore, Hosting |
| PWA | next-pwa | 5.x | Service worker, offline |
| Testing | Vitest + Testing Library | 1.x | Unit & integration tests |
| Linting | ESLint + Prettier | 8.x | Code quality |

---

## 3. Project Structure

```
habit-tracker/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── public/
│   ├── icons/                  # PWA icons
│   └── manifest.json           # PWA manifest
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Dashboard (main page)
│   │   ├── settings/
│   │   │   └── page.tsx        # Settings page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   └── ProgressBar.tsx
│   │   ├── habits/             # Habit-specific components
│   │   │   ├── HabitList.tsx
│   │   │   ├── HabitItem.tsx
│   │   │   ├── AddHabitModal.tsx
│   │   │   └── EditHabitModal.tsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Header.tsx
│   │   │   └── Container.tsx
│   │   └── dashboard/          # Dashboard components
│   │       ├── DailyProgress.tsx
│   │       ├── WelcomeMessage.tsx
│   │       └── DateDisplay.tsx
│   ├── contexts/               # React Contexts
│   │   ├── AuthContext.tsx     # Auth state
│   │   └── HabitsContext.tsx   # Habits state
│   ├── hooks/                  # Custom hooks
│   │   ├── useHabits.ts        # Habit operations
│   │   ├── useAuth.ts          # Auth operations
│   │   └── useLocalStorage.ts  # Local storage
│   ├── lib/                    # Utilities & configs
│   │   ├── firebase.ts         # Firebase config
│   │   ├── storage.ts          # Local storage helpers
│   │   └── messages.ts         # Supportive messages
│   ├── types/                  # TypeScript types
│   │   ├── habit.ts
│   │   └── user.ts
│   └── utils/                  # Utility functions
│       ├── date.ts             # Date helpers
│       └── streak.ts           # Streak calculations
├── tests/                      # Test files
│   ├── components/
│   └── hooks/
├── .env.local                  # Environment variables
├── .env.example                # Example env file
├── next.config.js              # Next.js config
├── tailwind.config.js          # Tailwind config
├── tsconfig.json               # TypeScript config
├── vitest.config.ts            # Vitest config
└── package.json
```

---

## 4. Data Model

### 4.1 TypeScript Types

```typescript
// types/habit.ts
interface Habit {
  id: string;
  name: string;
  createdAt: Date;
  order: number;
}

interface HabitLog {
  date: string;        // YYYY-MM-DD format
  completed: boolean;
  completedAt?: Date;
}

interface HabitWithStats extends Habit {
  logs: Record<string, HabitLog>;  // key = date
  currentStreak: number;
  longestStreak: number;
}

// types/user.ts
interface User {
  id: string;
  isAnonymous: boolean;
  email?: string;
  createdAt: Date;
}
```

### 4.2 Firestore Structure

```
users/
└── {userId}/
    ├── profile: {
    │     createdAt: timestamp,
    │     email?: string
    │   }
    └── habits/
        └── {habitId}/
            ├── name: string
            ├── createdAt: timestamp
            ├── order: number
            └── logs/
                └── {date}/     # e.g., "2026-01-07"
                    ├── completed: boolean
                    └── completedAt?: timestamp
```

### 4.3 Local Storage Structure

```typescript
// localStorage key: "habit-tracker-data"
interface LocalData {
  habits: HabitWithStats[];
  lastSynced?: string;  // ISO date
  userId?: string;      // Anonymous user ID
}
```

---

## 5. Component Architecture

### 5.1 Component Hierarchy

```
App (layout.tsx)
├── AuthProvider
│   └── HabitsProvider
│       ├── Dashboard (page.tsx)
│       │   ├── Header
│       │   │   └── SettingsLink
│       │   ├── DateDisplay
│       │   ├── WelcomeMessage
│       │   ├── DailyProgress
│       │   ├── HabitList
│       │   │   └── HabitItem (× n)
│       │   │       ├── HabitCheckbox
│       │   │       └── StreakBadge
│       │   ├── AddHabitButton
│       │   └── AddHabitModal
│       │       └── HabitForm
│       └── Settings (settings/page.tsx)
│           ├── AccountSection
│           │   ├── LoginForm
│           │   └── RegisterForm
│           └── AppInfo
```

### 5.2 Key Component Specifications

**HabitItem.tsx**
```typescript
interface HabitItemProps {
  habit: HabitWithStats;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}
```
- Swipe-to-reveal actions (edit/delete)
- One-tap toggle
- Streak badge display
- Smooth animations on state change

**DailyProgress.tsx**
```typescript
interface DailyProgressProps {
  completed: number;
  total: number;
}
```
- Circular or linear progress indicator
- "x/y tapaa tehty" text
- Celebratory state when 100%

---

## 6. State Management

### 6.1 Context Structure

```typescript
// AuthContext
interface AuthState {
  user: User | null;
  loading: boolean;
  signInAnonymously: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// HabitsContext
interface HabitsState {
  habits: HabitWithStats[];
  loading: boolean;
  todayProgress: { completed: number; total: number };
  addHabit: (name: string) => Promise<void>;
  toggleHabit: (id: string) => Promise<void>;
  editHabit: (id: string, name: string) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
}
```

### 6.2 Data Flow

1. **App Start** → Load from localStorage
2. **Auth Check** → Anonymous sign-in if no user
3. **Firestore Sync** → Merge cloud data with local
4. **User Action** → Update local state → Persist to localStorage → Sync to Firestore
5. **Offline** → Queue changes → Sync when online

---

## 7. API & Firebase Integration

### 7.1 Firebase Services

| Service | Usage |
|---------|-------|
| Authentication | Anonymous + Email/Password |
| Firestore | Habits data storage |
| Hosting | Static hosting (optional, can use Vercel) |

### 7.2 Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

### 7.3 Firebase Config

```typescript
// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
```

---

## 8. PWA Configuration

### 8.1 next.config.js

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  // Next.js config
});
```

### 8.2 Manifest

```json
{
  "name": "DevHabit",
  "short_name": "DevHabit",
  "description": "Developer growth habit tracker",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0d1117",
  "theme_color": "#238636",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 9. Coding Standards

### 9.1 File Naming
- Components: PascalCase (`HabitItem.tsx`)
- Hooks: camelCase with `use` prefix (`useHabits.ts`)
- Utils: camelCase (`dateUtils.ts`)
- Types: PascalCase (`Habit.ts`)

### 9.2 Component Pattern

```typescript
// Functional components with TypeScript
interface Props {
  // Props definition
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Hooks first
  // Event handlers
  // Early returns
  // Main render
}
```

### 9.3 Import Order
1. React/Next.js
2. Third-party libraries
3. Local components
4. Hooks
5. Utils/Types
6. Styles

### 9.4 Tailwind Conventions
- Mobile-first responsive (`md:`, `lg:`)
- Semantic color classes (define in config)
- Extract repeated patterns to components, not @apply

---

## 10. Testing Strategy

### 10.1 Testing Pyramid

| Level | Tools | Coverage Target |
|-------|-------|-----------------|
| Unit | Vitest | Utilities, hooks: 80% |
| Component | Testing Library | UI components: 70% |
| E2E | Playwright (post-MVP) | Critical paths: 100% |

### 10.2 What to Test

**Must Test:**
- Streak calculation logic
- Date utilities
- Habit toggle behavior
- Form validation

**Should Test:**
- Component rendering
- User interactions
- Context providers

**Can Skip (MVP):**
- Firebase integration (mock)
- Full E2E flows

---

## 11. Environment Variables

```env
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=xxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxx
```

---

## 12. Deployment

### 12.1 Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Configure environment variables
3. Auto-deploy on push to main

### 12.2 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
```

---

## 13. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |
| Bundle Size (initial) | < 100KB |

---

## 14. Security Considerations

- Firebase Security Rules enforce user isolation
- Environment variables for sensitive config
- No PII stored without encryption
- HTTPS enforced via hosting platform
- Anonymous auth limits data exposure

---

*Dokumentti päivitetty BMAD-metodilla — v2.0 (Developer Focus Pivot)*

# Story 4.1: Firebase Setup & Anonymous Auth

**Epic:** [Epic 4: Auth](../epics/epic-4-auth.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Epic 2 completed

---

## User Story

**As a** developer,
**I want** Firebase configured with anonymous authentication,
**so that** users can start using the app immediately.

---

## Acceptance Criteria

1. Firebase-projekti luotu ja konfiguroitu
2. Firebase SDK integroitu Next.js-projektiin
3. Anonymous auth toimii automaattisesti ensimmäisellä käynnistyksellä
4. Käyttäjälle luodaan uniikki ID
5. Environment variables konfiguroitu turvallisesti

---

## Technical Notes

### Firebase Console Setup

1. Create project at console.firebase.google.com
2. Enable Authentication > Anonymous sign-in
3. Create Firestore database
4. Get config keys

### Install Dependencies

```bash
npm install firebase
```

### Firebase Config

```typescript
// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Auth Context

```typescript
// contexts/AuthContext.tsx
export function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser({ id: firebaseUser.uid, isAnonymous: firebaseUser.isAnonymous });
      } else {
        // Auto sign in anonymously
        await signInAnonymously(auth);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
```

### Environment Variables

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

## Definition of Done

- [ ] Firebase-projekti luotu
- [ ] SDK integroitu
- [ ] Anonymous auth toimii
- [ ] Env vars konfiguroitu

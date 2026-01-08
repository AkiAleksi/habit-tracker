# Story 4.3: Email Registration & Account Linking

**Epic:** [Epic 4: Auth](../epics/epic-4-auth.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 4.2

---

## User Story

**As a** user,
**I want** to register with my email,
**so that** I can access my habits from any device.

---

## Acceptance Criteria

1. Settings-näkymässä "Luo tili" -nappi
2. Rekisteröitymislomake: email + salasana
3. Anonymous-tili linkitetään email-tiliin (data säilyy)
4. Kirjautuminen toimii toiselta laitteelta
5. "Kirjaudu ulos" -toiminto
6. Salasanan validointi (min 8 merkkiä)

---

## Technical Notes

### Account Linking

```typescript
import {
  linkWithCredential,
  EmailAuthProvider,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Link anonymous account to email
async function linkToEmail(email: string, password: string) {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    await linkWithCredential(auth.currentUser, credential);
    // User now has email login, keeps same UID
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      // Email exists - sign in instead
      throw new Error('Tämä sähköposti on jo käytössä. Kirjaudu sisään.');
    }
    throw error;
  }
}

// Sign in with email
async function signInEmail(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password);
}

// Sign out
async function logout() {
  await signOut(auth);
  // Will auto-create new anonymous user
}
```

### Registration Form

```typescript
// components/auth/RegisterForm.tsx
interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const validation = {
  email: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  password: (v: string) => v.length >= 8,
  confirmPassword: (v: string, password: string) => v === password,
};
```

### Auth Context Updates

```typescript
interface AuthContextValue {
  user: User | null;
  loading: boolean;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
```

---

## UI Flow

```
Settings (anonymous):
┌────────────────────────────┐
│  Olet kirjautunut          │
│  nimettömänä               │
│                            │
│  ╔══════════════════════╗  │
│  ║   Luo tili           ║  │
│  ╚══════════════════════╝  │
└────────────────────────────┘
         │
         ▼
Register Modal:
┌────────────────────────────┐
│  Luo tili                  │
│                            │
│  Sähköposti                │
│  ┌────────────────────┐    │
│  │                    │    │
│  └────────────────────┘    │
│                            │
│  Salasana (min 8 merkkiä)  │
│  ┌────────────────────┐    │
│  │                    │    │
│  └────────────────────┘    │
│                            │
│  [Peruuta]  [Rekisteröidy] │
└────────────────────────────┘
```

---

## Definition of Done

- [ ] Rekisteröinti toimii
- [ ] Anonymous-tili linkittyy
- [ ] Kirjautuminen toimii
- [ ] Uloskirjautuminen toimii
- [ ] Validointi toimii

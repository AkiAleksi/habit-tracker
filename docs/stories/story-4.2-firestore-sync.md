# Story 4.2: Firestore Data Model & Sync

**Epic:** [Epic 4: Auth](../epics/epic-4-auth.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 4.1

---

## User Story

**As a** user,
**I want** my habits to sync to the cloud,
**so that** I don't lose them if I clear my browser data.

---

## Acceptance Criteria

1. Firestore-kokoelmarakenne: users/{userId}/habits/{habitId}
2. Paikallinen data synkronoidaan Firestoreen
3. Firestore-data ladataan kun sovellus käynnistyy
4. Offline-toiminta: muutokset synkronoidaan kun yhteys palaa
5. Security rules estävät pääsyn muiden käyttäjien dataan

---

## Technical Notes

### Firestore Structure

```
users/
└── {userId}/
    └── habits/
        └── {habitId}/
            ├── name: string
            ├── createdAt: timestamp
            ├── order: number
            └── logs: {
                  "2026-01-07": { completed: true, completedAt: timestamp }
                }
```

### Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}
```

### Sync Logic

```typescript
// hooks/useFirestoreSync.ts
export function useFirestoreSync(userId: string | null) {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load from Firestore on mount
  useEffect(() => {
    if (!userId) return;

    const habitsRef = collection(db, 'users', userId, 'habits');
    const unsubscribe = onSnapshot(habitsRef, (snapshot) => {
      const loaded = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHabits(loaded);
    });

    return unsubscribe;
  }, [userId]);

  const saveHabit = async (habit: Habit) => {
    if (!userId) return;
    const habitRef = doc(db, 'users', userId, 'habits', habit.id);
    await setDoc(habitRef, habit);
  };

  return { habits, saveHabit };
}
```

### Offline Support

Firebase automatically handles offline persistence:

```typescript
// lib/firebase.ts
import { enableIndexedDbPersistence } from 'firebase/firestore';

enableIndexedDbPersistence(db).catch((err) => {
  console.warn('Offline persistence failed:', err);
});
```

---

## Definition of Done

- [ ] Data synkronoituu Firestoreen
- [ ] Data latautuu käynnistyksessä
- [ ] Offline-toiminta toimii
- [ ] Security rules testattu

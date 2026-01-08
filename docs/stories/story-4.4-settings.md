# Story 4.4: Settings Screen

**Epic:** [Epic 4: Auth](../epics/epic-4-auth.md)
**Status:** Draft
**Priority:** P1
**Depends on:** Story 4.3

---

## User Story

**As a** user,
**I want** a settings screen to manage my account,
**so that** I have control over my app experience.

---

## Acceptance Criteria

1. Settings-linkki dashboardilla (hamburger menu tai ikoni)
2. Settings näyttää käyttäjän tilan (anonymous vs. rekisteröitynyt)
3. Rekisteröityneelle: email näkyy, logout-nappi
4. Anonymous: "Luo tili" -nappi
5. Versionnumero näkyy sivun alalaidassa
6. Takaisin-navigointi dashboardille

---

## Technical Notes

### Page Structure

```typescript
// app/settings/page.tsx
export default function SettingsPage() {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <Header title="Asetukset" showBack />

      <section className="mb-8">
        <h2>Tili</h2>
        {user?.isAnonymous ? (
          <AnonymousAccountCard />
        ) : (
          <RegisteredAccountCard email={user?.email} onSignOut={signOut} />
        )}
      </section>

      <section className="mb-8">
        <h2>Tietoja</h2>
        <AppInfoCard />
      </section>

      <footer className="text-center text-sm text-gray-500">
        Versio {process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}
      </footer>
    </Container>
  );
}
```

### Components

```typescript
// AnonymousAccountCard.tsx
function AnonymousAccountCard() {
  return (
    <Card>
      <p>Olet kirjautunut nimettömänä.</p>
      <p className="text-sm text-gray-600">
        Luo tili varmistaaksesi, ettet menetä tietojasi.
      </p>
      <Button onClick={openRegisterModal}>Luo tili</Button>
    </Card>
  );
}

// RegisteredAccountCard.tsx
function RegisteredAccountCard({ email, onSignOut }) {
  return (
    <Card>
      <p>Kirjautunut: {email}</p>
      <Button variant="secondary" onClick={onSignOut}>
        Kirjaudu ulos
      </Button>
    </Card>
  );
}
```

### Navigation from Dashboard

```typescript
// components/layout/Header.tsx
export function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Habit Tracker</h1>
      <Link href="/settings" aria-label="Asetukset">
        <SettingsIcon />
      </Link>
    </header>
  );
}
```

---

## UI Mockup

```
┌────────────────────────────┐
│  ← Asetukset               │
├────────────────────────────┤
│                            │
│  TILI                      │
│  ┌────────────────────┐    │
│  │ Kirjautunut:       │    │
│  │ user@example.com   │    │
│  │                    │    │
│  │ [Kirjaudu ulos]    │    │
│  └────────────────────┘    │
│                            │
│  TIETOJA                   │
│  ┌────────────────────┐    │
│  │ Habit Tracker      │    │
│  │ Yksinkertainen     │    │
│  │ tapaseuranta       │    │
│  └────────────────────┘    │
│                            │
│       Versio 1.0.0         │
└────────────────────────────┘
```

---

## Definition of Done

- [ ] Settings-sivu toimii
- [ ] Käyttäjän tila näkyy
- [ ] Navigaatio toimii
- [ ] Versio näkyy

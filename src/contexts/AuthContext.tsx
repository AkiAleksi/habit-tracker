'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  linkWithCredential,
  linkWithPopup,
  EmailAuthProvider,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirebaseAuth } from '@/lib/firebase';
import { User } from '@/types/user';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  error: string | null;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          isAnonymous: firebaseUser.isAnonymous,
          email: firebaseUser.email || undefined,
          createdAt: new Date(firebaseUser.metadata.creationTime || Date.now()),
        });
      } else {
        // Auto sign in anonymously
        try {
          await signInAnonymously(auth);
        } catch (err) {
          console.error('Anonymous sign in failed:', err);
          setError('Kirjautuminen epäonnistui');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const registerWithEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth || !auth.currentUser) {
      throw new Error('Auth not initialized');
    }

    setError(null);

    try {
      const credential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(auth.currentUser, credential);
      // User now has email login, keeps same UID
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Tämä sähköposti on jo käytössä. Kirjaudu sisään.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('Salasanan tulee olla vähintään 6 merkkiä.');
      }
      throw new Error('Rekisteröinti epäonnistui. Yritä uudelleen.');
    }
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error('Auth not initialized');
    }

    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Virheellinen sähköposti tai salasana.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('Virheellinen sähköpostiosoite.');
      }
      throw new Error('Kirjautuminen epäonnistui. Yritä uudelleen.');
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) {
      throw new Error('Auth not initialized');
    }

    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      // If user is anonymous, link with Google
      if (auth.currentUser?.isAnonymous) {
        await linkWithPopup(auth.currentUser, provider);
      } else {
        // Otherwise just sign in
        await signInWithPopup(auth, provider);
      }
    } catch (err: unknown) {
      const error = err as { code?: string };
      if (error.code === 'auth/credential-already-in-use') {
        // Account exists, sign in instead
        await signInWithPopup(auth, provider);
      } else if (error.code === 'auth/popup-closed-by-user') {
        throw new Error('Kirjautuminen peruutettu.');
      } else {
        throw new Error('Google-kirjautuminen epäonnistui. Yritä uudelleen.');
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    setError(null);

    try {
      await firebaseSignOut(auth);
      // Will auto-create new anonymous user via onAuthStateChanged
    } catch {
      throw new Error('Uloskirjautuminen epäonnistui.');
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    error,
    registerWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

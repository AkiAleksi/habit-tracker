export interface User {
  id: string;
  isAnonymous: boolean;
  email?: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

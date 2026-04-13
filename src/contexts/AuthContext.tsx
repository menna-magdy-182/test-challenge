import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { authSessionEvents } from '@/api/authSessionEvents';
import { authStorage } from '@/features/auth/store/authStorage';
import type { AuthSession } from '@/features/auth/types/auth.types';

type AuthContextValue = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  isRestoringSession: boolean;
  setSession: (session: AuthSession) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [session, setSessionState] = useState<AuthSession | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await authStorage.getSession();
        setSessionState(storedSession);
      } finally {
        setIsRestoringSession(false);
      }
    };

    restoreSession();
  }, []);

  const setSession = useCallback(async (nextSession: AuthSession) => {
    authStorage.saveSession(nextSession);
    setSessionState(nextSession);
  }, []);

  const logout = useCallback(async () => {
    authStorage.clearSession();
    setSessionState(null);
  }, []);

  useEffect(() => {
    authSessionEvents.setOnUnauthorized(logout);

    return () => {
      authSessionEvents.setOnUnauthorized(null);
    };
  }, [logout]);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.accessToken),
      isRestoringSession,
      setSession,
      logout,
    }),
    [isRestoringSession, logout, session, setSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

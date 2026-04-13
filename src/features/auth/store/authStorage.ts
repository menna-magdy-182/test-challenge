import { storage } from '@/storage/mmkv';
import { storageKeys } from '@/storage/keys';
import type { AuthSession } from '@/features/auth/types/auth.types';

export const authStorage = {
  saveSession(session: AuthSession) {
    storage.set(storageKeys.accessToken, session.accessToken);
    storage.set(storageKeys.refreshToken, session.refreshToken);
    storage.set(storageKeys.tokenType, session.tokenType);
    storage.set(storageKeys.expiresIn, String(session.expiresIn));
  },

  getSession(): AuthSession | null {
    const accessToken = storage.getString(storageKeys.accessToken);
    const refreshToken = storage.getString(storageKeys.refreshToken);
    const tokenType = storage.getString(storageKeys.tokenType);
    const expiresIn = storage.getString(storageKeys.expiresIn);

    if (!accessToken || !refreshToken || !tokenType || !expiresIn) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      tokenType,
      expiresIn: Number(expiresIn),
    };
  },

  clearSession() {
    storage.remove(storageKeys.accessToken);
    storage.remove(storageKeys.refreshToken);
    storage.remove(storageKeys.tokenType);
    storage.remove(storageKeys.expiresIn);
  },
};

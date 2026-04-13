import axios from 'axios';

import { authSessionEvents } from './authSessionEvents';
import { API_BASE_URL } from './endpoints';

export const createApiClient = (accessToken?: string) => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });

  client.interceptors.response.use(
    response => response,
    async error => {
      // If a protected request returns 401, clear the current session and force re-authentication.
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await authSessionEvents.notifyUnauthorized();
      }

      return Promise.reject(error);
    },
  );

  return client;
};

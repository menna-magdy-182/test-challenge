import axios from 'axios';

import { API_BASE_URL } from './endpoints';

export const createApiClient = (accessToken?: string) => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : undefined,
  });
};

import { createApiClient } from './client';
import { apiEndpoints } from './endpoints';

import type {
  LoginRequest,
  LoginResponse,
} from '@/features/auth/types/auth.types';

export const authApi = {
  async login(payload: LoginRequest) {
    const client = createApiClient();
    const response = await client.post<LoginResponse>(
      apiEndpoints.login,
      payload,
    );

    return response.data;
  },
};

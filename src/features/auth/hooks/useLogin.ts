import { useMutation } from '@tanstack/react-query';

import { authApi } from '@/api/auth.api';
import { useAuth } from '@/contexts/AuthContext';

import type { LoginRequest } from '@/features/auth/types/auth.types';

export const useLogin = () => {
  const { setSession } = useAuth();

  return useMutation({
    mutationFn: async (payload: LoginRequest) => {
      const response = await authApi.login(payload);
      return response;
    },
    onSuccess: async response => {
      await setSession({
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        tokenType: response.token_type,
        expiresIn: response.expires_in,
      });
    },
  });
};

import { useQuery } from '@tanstack/react-query';

import { testsApi } from '@/api/tests.api';
import { useAuth } from '@/contexts/AuthContext';

export const useTests = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ['tests'],
    queryFn: async () => {
      if (!session?.accessToken) {
        throw new Error('Missing access token');
      }

      return testsApi.getTests(session.accessToken);
    },
    enabled: Boolean(session?.accessToken),
  });
};

import { createApiClient } from '@/api/client';
import { apiEndpoints } from '@/api/endpoints';

import type { TestsListResponse } from '@/features/tests/types/tests.types';

export const testsApi = {
  async getTests(accessToken: string) {
    const client = createApiClient(accessToken);
    const response = await client.get<TestsListResponse>(apiEndpoints.tests);

    return response.data;
  },
};

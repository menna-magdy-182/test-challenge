import React from 'react';

import { renderWithProviders } from '@/test-utils/renderWithProviders';
import { TestsListScreen } from '@/features/tests/screens/TestsListScreen';
import { useTests } from '@/features/tests/hooks/useTests';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('@/features/tests/hooks/useTests');
jest.mock('@/contexts/AuthContext');

const mockUseTests = useTests as jest.Mock;
const mockUseAuth = useAuth as jest.Mock;

const mockLogout = jest.fn();
const mockRefetch = jest.fn();

describe('TestsListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseAuth.mockReturnValue({
      logout: mockLogout,
    });
  });

  it('renders loading state while tests are being fetched', () => {
    mockUseTests.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
      isRefetching: false,
      refetch: mockRefetch,
    });

    const { getByText } = renderWithProviders(<TestsListScreen />);

    expect(getByText('Loading available tests...')).toBeTruthy();
  });

  it('renders categorized test sections when data is available', () => {
    mockUseTests.mockReturnValue({
      data: {
        data: {
          screen_test_taken: 0,
          live_session_approved: 0,
          waiting_for_tester_screening_approval: 0,
          screener_test: null,
          standard_tests: [
            {
              testsuite_id: 101,
              testDuration: 20,
              requirements: null,
              extra_requirements: [],
              device_name: 'Phone',
              fee: 10,
              test_type: 'unmoderated',
              os: 'both',
              camera: 0,
            },
          ],
          standard_tests_done: 0,
          three_minute_tests: [],
          three_minute_tests_done: 0,
          guerilla_tests: [],
          mod_rut_tests: [
            {
              testsuite_id: 103,
              testDuration: 15,
              requirements: null,
              extra_requirements: [],
              device_name: 'Phone',
              fee: 3,
              test_type: 'moderated',
              camera: 0,
              mod_rut_id: 900,
            },
          ],
          mod_rut_taken_tests: [],
        },
      },
      error: null,
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
    });

    const { getByText } = renderWithProviders(<TestsListScreen />);

    expect(getByText('Moderated tests')).toBeTruthy();
    expect(getByText('Unmoderated tests')).toBeTruthy();
    expect(getByText('Moderated session')).toBeTruthy();
    expect(getByText('Standard test')).toBeTruthy();
  });

  it('renders error state when the fetch fails', () => {
    mockUseTests.mockReturnValue({
      data: undefined,
      error: new Error('Network error'),
      isLoading: false,
      isRefetching: false,
      refetch: mockRefetch,
    });

    const { getByText } = renderWithProviders(<TestsListScreen />);

    expect(getByText('Unable to load tests')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
    expect(getByText('Log out')).toBeTruthy();
  });
});

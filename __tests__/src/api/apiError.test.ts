import axios from 'axios';
import { getApiError } from '@/api/apiError';

jest.mock('axios');
jest.mock('@/i18n', () => ({
  __esModule: true,
  default: {
    t: (key: string) => key,
  },
}));

const mockIsAxiosError = axios.isAxiosError as jest.MockedFunction<
  typeof axios.isAxiosError
>;

const makeAxiosError = (data?: object, status = 400): unknown => ({
  message: 'Request failed',
  isAxiosError: true,
  response: { data, status },
});

describe('getApiError', () => {
  beforeEach(() => {
    mockIsAxiosError.mockReset();
  });

  it('returns a generic error for non-axios errors', () => {
    mockIsAxiosError.mockReturnValue(false);
    const result = getApiError(new Error('network'));
    expect(result.message).toBe('common.errors.genericError');
    expect(result.fieldErrors).toBeUndefined();
  });

  it('returns the message string from the API response', () => {
    mockIsAxiosError.mockReturnValue(true);
    const error = makeAxiosError({ message: 'Email is taken' });
    const result = getApiError(error);
    expect(result.message).toBe('Email is taken');
  });

  it('ignores a blank message string and falls through to generic error', () => {
    mockIsAxiosError.mockReturnValue(true);
    const error = makeAxiosError({ message: '   ' });
    const result = getApiError(error);
    expect(result.message).toBe('common.errors.genericError');
  });

  it('uses error_description for 401-style responses', () => {
    mockIsAxiosError.mockReturnValue(true);
    const error = makeAxiosError(
      { error_description: 'Invalid credentials' },
      401,
    );
    const result = getApiError(error);
    expect(result.message).toBe('Invalid credentials');
  });

  it('returns fieldErrors when message is a validation errors object', () => {
    mockIsAxiosError.mockReturnValue(true);
    const fieldErrors = {
      email: ['Email is invalid'],
      password: ['Too short'],
    };
    const error = makeAxiosError({ message: fieldErrors }, 422);
    const result = getApiError(error);
    expect(result.message).toBe('common.errors.validationError');
    expect(result.fieldErrors).toEqual(fieldErrors);
  });

  it('falls back to generic error when response has no recognized shape', () => {
    mockIsAxiosError.mockReturnValue(true);
    const error = makeAxiosError({ unexpected: true });
    const result = getApiError(error);
    expect(result.message).toBe('common.errors.genericError');
  });

  it('falls back to generic error when response data is undefined', () => {
    mockIsAxiosError.mockReturnValue(true);
    const error = makeAxiosError();
    const result = getApiError(error);
    expect(result.message).toBe('common.errors.genericError');
  });
});

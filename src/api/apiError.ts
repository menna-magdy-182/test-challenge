import axios from 'axios';

type ApiValidationErrors = Record<string, string[] | string>;

export type ApiErrorResult = {
  message: string;
  fieldErrors?: ApiValidationErrors;
};

export const getApiError = (error: unknown): ApiErrorResult => {
  if (!axios.isAxiosError(error)) {
    return {
      message: 'Something went wrong. Please try again.',
    };
  }

  const data = error.response?.data as
    | {
        message?: string | ApiValidationErrors;
        error_description?: string;
      }
    | undefined;

  if (typeof data?.message === 'string' && data.message.trim()) {
    return {
      message: data.message,
    };
  }

  if (data?.error_description) {
    return {
      message: data.error_description,
    };
  }

  if (data?.message && typeof data.message === 'object') {
    return {
      message: 'Please check your input and try again.',
      fieldErrors: data.message,
    };
  }

  return {
    message: 'Something went wrong. Please try again.',
  };
};

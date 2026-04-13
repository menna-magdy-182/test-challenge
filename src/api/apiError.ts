import axios from 'axios';
import i18n from '@/i18n';

type ApiValidationErrors = Record<string, string[] | string>;

export type ApiErrorResult = {
  message: string;
  fieldErrors?: ApiValidationErrors;
};

export const getApiError = (error: unknown): ApiErrorResult => {
  if (!axios.isAxiosError(error)) {
    return {
      message: i18n.t('common.errors.genericError'),
    };
  }

  const data = error.response?.data as
    | {
        message?: string | ApiValidationErrors;
        error_description?: string;
      }
    | undefined;

  // Standard API error shape where `message` is a plain string.
  if (typeof data?.message === 'string' && data.message.trim()) {
    return {
      message: data.message,
    };
  }

  // Login 401 responses may return `error_description` for invalid credentials.
  if (data?.error_description) {
    return {
      message: data.error_description,
    };
  }

  // Validation 422 responses may return `message` as a validation errors map keyed by field name (e.g. `email`, `password`).
  if (data?.message && typeof data.message === 'object') {
    return {
      message: i18n.t('common.errors.validationError'),
      fieldErrors: data.message,
    };
  }

  // Fallback for unexpected or unstructured API errors.
  return {
    message: i18n.t('common.errors.genericError'),
  };
};

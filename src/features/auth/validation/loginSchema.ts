import { z } from 'zod';
import i18n from '@/i18n';

export const createLoginSchema = () =>
  z.object({
    email: z
      .string()
      .trim()
      .check(z.email({ error: i18n.t('auth.validation.emailInvalid') })),
    password: z
      .string()
      .trim()
      .min(1, { error: i18n.t('auth.validation.passwordRequired') })
      .min(6, { error: i18n.t('auth.validation.passwordMinLength') }),
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;

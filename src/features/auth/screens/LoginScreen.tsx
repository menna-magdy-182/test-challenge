import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { getApiError } from '@/api/apiError';
import { useLogin } from '@/features/auth/hooks/useLogin';
import {
  createLoginSchema,
  type LoginFormValues,
} from '@/features/auth/validation/loginSchema';
import { AppButton, AppInput, AppScreen, AppText } from '@/components/common';
import { styles } from './LoginScreen.styles';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const loginMutation = useLogin();

  const defaultValues = useMemo<LoginFormValues>(
    () => ({
      email: 'jdouglas@example.com',
      password: '123123',
    }),
    [],
  );

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(createLoginSchema()),
  });

  const onSubmit = handleSubmit(async values => {
    try {
      await loginMutation.mutateAsync(values);
    } catch (error) {
      const { fieldErrors } = getApiError(error);
      console.error('err', fieldErrors);

      if (fieldErrors) {
        (['email', 'password'] as const).forEach(field => {
          const err = fieldErrors[field];

          if (err) {
            setError(field, {
              type: 'server',
              message: Array.isArray(err) ? err[0] : err,
            });
          }
        });
      }
    }
  });

  const formErrorMessage = useMemo(() => {
    if (!loginMutation.error) {
      return null;
    }

    return getApiError(loginMutation.error).message;
  }, [loginMutation.error]);

  return (
    <AppScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardContainer}
      >
        <View style={styles.header}>
          <AppText variant="h1">{t('auth.login.title')}</AppText>
          <AppText variant="body" style={styles.subtitle}>
            {t('auth.login.subtitle')}
          </AppText>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange, value } }) => (
              <AppInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.email?.message}
                keyboardType="email-address"
                label={t('common.email')}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={t('auth.login.emailPlaceholder')}
                returnKeyType="next"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <AppInput
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.password?.message}
                label={t('common.password')}
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder={t('auth.login.passwordPlaceholder')}
                returnKeyType="done"
                secureTextEntry
                value={value}
              />
            )}
          />

          {formErrorMessage ? (
            <AppText variant="caption" style={styles.formError}>
              {formErrorMessage}
            </AppText>
          ) : null}

          <AppButton
            disabled={!isValid}
            loading={loginMutation.isPending}
            onPress={onSubmit}
            style={styles.button}
            title={t('auth.login.submitButton')}
          />
        </View>
      </KeyboardAvoidingView>
    </AppScreen>
  );
};

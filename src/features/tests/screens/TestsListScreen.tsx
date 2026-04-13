import React from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppScreen, AppText } from '@/components/common';
import { colors, spacing } from '@/theme';

export const TestsListScreen = () => {
  const { t } = useTranslation();

  return (
    <AppScreen>
      <AppText variant="h1">{t('tests.list.title')}</AppText>
      <AppText variant="body" style={styles.subtitle}>
        {t('tests.list.subtitle')}
      </AppText>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
});

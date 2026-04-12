import React from 'react';
import { StyleSheet } from 'react-native';

import { AppScreen, AppText } from '@/src/components/common';
import { colors, spacing } from '@/src/theme';

export const LoginScreen = () => {
  return (
    <AppScreen>
      <AppText variant="h1">Login</AppText>
      <AppText variant="body" style={styles.subtitle}>
        Login screen foundation is ready.
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

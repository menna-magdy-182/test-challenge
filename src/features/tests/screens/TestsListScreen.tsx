import React from 'react';
import { StyleSheet } from 'react-native';

import { AppScreen, AppText } from '@/src/components/common';
import { colors, spacing } from '@/src/theme';

export const TestsListScreen = () => {
  return (
    <AppScreen>
      <AppText variant="h1">Tests List</AppText>
      <AppText variant="body" style={styles.subtitle}>
        App flow foundation is ready.
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

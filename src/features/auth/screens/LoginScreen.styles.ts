import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

export const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.md,
  },
  formError: {
    color: colors.error,
  },
  button: {
    marginTop: spacing.xs,
  },
});

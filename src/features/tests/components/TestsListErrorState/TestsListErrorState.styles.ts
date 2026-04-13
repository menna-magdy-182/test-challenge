import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/theme';

const styles = StyleSheet.create({
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateText: {
    marginTop: spacing.md,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  errorTitle: {
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.xl,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  retryButtonText: {
    color: colors.textInverse,
  },
  secondaryButton: {
    marginTop: spacing.md,
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  secondaryButtonText: {
    color: colors.textPrimary,
  },
});

export default styles;

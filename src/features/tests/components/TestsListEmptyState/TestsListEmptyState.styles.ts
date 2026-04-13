import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

const styles = StyleSheet.create({
  emptyState: {
    paddingTop: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  emptyTitle: {
    color: colors.textPrimary,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default styles;

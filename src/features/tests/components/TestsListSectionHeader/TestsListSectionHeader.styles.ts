import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '@/theme';

const styles = StyleSheet.create({
  sectionHeader: {
    marginVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionIconBadge: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: colors.textPrimary,
  },
  sectionCountBadge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    minWidth: 28,
    alignItems: 'center',
  },
  sectionCount: {
    fontWeight: '600',
  },
});

export default styles;

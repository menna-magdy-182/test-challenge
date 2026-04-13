import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerSubtitle: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: spacing.xs,
    padding: spacing.xs,
  },
  searchInput: {
    marginTop: spacing.xl,
  },
  resultsCount: {
    marginTop: spacing.sm,
    color: colors.textSecondary,
  },
});

export default styles;

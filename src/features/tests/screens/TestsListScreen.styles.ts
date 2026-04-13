import { StyleSheet } from 'react-native';

import { colors, spacing } from '@/theme';

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: spacing.xxl,
  },
  cardWrapper: {
    marginBottom: spacing.md,
  },
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
});

export default styles;

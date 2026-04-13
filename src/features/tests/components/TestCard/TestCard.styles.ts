import { StyleSheet } from 'react-native';

import { colors, radius, shadows, spacing } from '@/theme';

export const CATEGORY_CONFIG: Record<
  'moderated' | 'unmoderated',
  { color: string; icon: string; badgeBackgroundColor: string }
> = {
  moderated: {
    color: colors.categoryModerated,
    icon: 'videocam-outline',
    badgeBackgroundColor: colors.categoryModeratedLight,
  },
  unmoderated: {
    color: colors.categoryUnmoderated,
    icon: 'phone-portrait-outline',
    badgeBackgroundColor: colors.categoryUnmoderatedLight,
  },
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.screenBackground,
    flexDirection: 'row',
    overflow: 'hidden',
    ...shadows.sm,
  },
  accentBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  title: {
    flex: 1,
    color: colors.textPrimary,
  },
  feeBadge: {
    borderWidth: 1,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
  },
  subtitle: {
    flex: 1,
    color: colors.textSecondary,
  },
  metaRow: {
    marginTop: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  durationText: {
    color: colors.textSecondary,
  },
});

export default styles;

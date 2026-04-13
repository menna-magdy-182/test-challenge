import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../../theme';

const styles = StyleSheet.create({
  label: {
    marginBottom: spacing.xs,
  },
  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: spacing.md,
  },
  inputContainerError: {
    borderColor: colors.error,
  },
  leftIconContainer: {
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    minHeight: 50,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  rightIconButton: {
    marginLeft: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: spacing.xs,
    color: colors.error,
  },
});

export default styles;

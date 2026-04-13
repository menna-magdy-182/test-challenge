import { colors, radius, spacing } from '@/theme';
import { StyleSheet } from 'react-native';

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
  input: {
    flex: 1,
    minHeight: 50,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
  toggleButton: {
    marginLeft: spacing.sm,
    paddingVertical: spacing.xs,
  },
  toggleText: {
    color: colors.primary,
  },
  errorText: {
    marginTop: spacing.xs,
    color: colors.error,
  },
});

export default styles;

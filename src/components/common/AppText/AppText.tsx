import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle,
} from 'react-native';

import { colors, typography } from '../../../theme';

type AppTextVariant = keyof typeof typography;

type AppTextProps = TextProps & {
  children: React.ReactNode;
  variant?: AppTextVariant;
  style?: StyleProp<TextStyle>;
};

export const AppText = ({
  children,
  variant = 'body',
  style,
  ...rest
}: AppTextProps) => {
  return (
    <Text {...rest} style={[styles.base, typography[variant], style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: colors.textPrimary,
  },
});

import React, { useState } from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../../theme';
import { AppText } from '../AppText/AppText';
import styles from './AppInput.styles';

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressRightIcon?: () => void;
};

export const AppInput = ({
  label,
  error,
  containerStyle,
  style,
  secureTextEntry,
  leftIcon,
  rightIcon,
  onPressRightIcon,
  ...rest
}: AppInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecureField = Boolean(secureTextEntry);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(previous => !previous);

  const resolvedRightIcon = secureTextEntry ? (
    <Ionicons
      color={colors.textSecondary}
      name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
      size={20}
    />
  ) : (
    rightIcon
  );

  const handleRightIconPress = () => {
    if (isSecureField) {
      togglePasswordVisibility();
      return;
    }

    onPressRightIcon?.();
  };

  return (
    <View style={containerStyle}>
      {label ? (
        <AppText variant="label" style={styles.label}>
          {label}
        </AppText>
      ) : null}

      <View
        style={[
          styles.inputContainer,
          error ? styles.inputContainerError : undefined,
        ]}
      >
        {leftIcon ? (
          <View style={styles.leftIconContainer}>{leftIcon}</View>
        ) : null}

        <TextInput
          {...rest}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={isSecureField ? !isPasswordVisible : false}
          style={[styles.input, style]}
        />

        {resolvedRightIcon ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={handleRightIconPress}
            style={styles.rightIconButton}
          >
            {resolvedRightIcon}
          </Pressable>
        ) : null}
      </View>

      {error ? (
        <AppText variant="caption" style={styles.errorText}>
          {error}
        </AppText>
      ) : null}
    </View>
  );
};

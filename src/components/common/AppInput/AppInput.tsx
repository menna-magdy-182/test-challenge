import React, { useState } from 'react';
import {
  Pressable,
  StyleProp,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { colors } from '../../../theme';
import { AppText } from '../AppText/AppText';
import styles from './AppInput.styles';

type AppInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
  showPasswordToggle?: boolean;
};

export const AppInput = ({
  label,
  error,
  containerStyle,
  style,
  secureTextEntry,
  ...rest
}: AppInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(previous => !previous);

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
        <TextInput
          {...rest}
          placeholderTextColor={colors.inputPlaceholder}
          secureTextEntry={secureTextEntry ? !isPasswordVisible : false}
          style={[styles.input, style]}
        />

        {secureTextEntry ? (
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            <AppText variant="label" style={styles.toggleText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </AppText>
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

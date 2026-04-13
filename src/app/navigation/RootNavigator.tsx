import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/theme';

export const RootNavigator = () => {
  const { isAuthenticated, isRestoringSession } = useAuth();

  if (isRestoringSession) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.screenBackground,
  },
});

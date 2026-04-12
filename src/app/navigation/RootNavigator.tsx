import React from 'react';

import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

export const RootNavigator = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />;
};

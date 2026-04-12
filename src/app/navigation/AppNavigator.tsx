import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TestsListScreen } from '../../features/tests/screens/TestsListScreen';
import type { AppStackParamList } from '../../types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen component={TestsListScreen} name="TestsList" />
    </Stack.Navigator>
  );
};

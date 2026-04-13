import React, { PropsWithChildren, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { colors } from '../../theme';
import { AuthProvider } from '@/contexts/AuthContext';

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.screenBackground,
    card: colors.screenBackground,
    primary: colors.primary,
    text: colors.textPrimary,
    border: colors.border,
  },
};

export const AppProviders = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            retry: 0,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavigationContainer theme={navigationTheme}>
          {children}
        </NavigationContainer>
      </AuthProvider>
    </QueryClientProvider>
  );
};

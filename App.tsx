import React from 'react';
import { StatusBar } from 'react-native';

import { RootNavigator } from './src/app/navigation/RootNavigator';
import { AppProviders } from './src/app/providers/AppProviders';
import { colors } from './src/theme';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={colors.screenBackground}
      />
      <RootNavigator />
    </AppProviders>
  );
}

export default App;

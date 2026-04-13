import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppInput, AppScreen } from '@/components/common';
import { colors } from '@/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TestsListScreen = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <AppScreen>
      <AppInput
        leftIcon={
          <Ionicons
            color={colors.textSecondary}
            name="search-outline"
            size={20}
          />
        }
        onChangeText={setSearchQuery}
        placeholder="Search tests"
        value={searchQuery}
      />
    </AppScreen>
  );
};

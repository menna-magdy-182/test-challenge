import React from 'react';
import { Pressable, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { AppInput } from '@/components/common/AppInput/AppInput';
import { AppText } from '@/components/common/AppText/AppText';
import { colors } from '@/theme';
import styles from './TestsListHeader.styles';

type Props = {
  onLogout: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
};

export const TestsListHeader = ({
  onLogout,
  searchQuery,
  onSearchChange,
  totalCount,
}: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.topRow}>
        <View style={styles.headerTextContainer}>
          <AppText variant="h1">{t('tests.list.title')}</AppText>
          <AppText style={styles.headerSubtitle} variant="body">
            {t('tests.list.subtitle')}
          </AppText>
        </View>
        <Pressable
          accessibilityLabel={t('tests.list.error.logout')}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onLogout}
          style={styles.logoutButton}
        >
          <Ionicons
            color={colors.textSecondary}
            name="log-out-outline"
            size={22}
          />
        </Pressable>
      </View>

      <AppInput
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.searchInput}
        leftIcon={
          <Ionicons
            color={colors.textSecondary}
            name="search-outline"
            size={20}
          />
        }
        onChangeText={onSearchChange}
        placeholder={t('tests.list.search.placeholder')}
        returnKeyType="search"
        value={searchQuery}
      />

      <AppText style={styles.resultsCount} variant="caption">
        {t('tests.list.results', { count: totalCount })}
      </AppText>
    </View>
  );
};

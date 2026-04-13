import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';

import { AppText } from '@/components/common/AppText/AppText';
import { colors } from '@/theme';
import styles from './TestsListEmptyState.styles';

export const TestsListEmptyState = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.emptyState}>
      <Ionicons color={colors.textSecondary} name="search-outline" size={36} />
      <AppText style={styles.emptyTitle} variant="bodyMedium">
        {t('tests.list.empty.title')}
      </AppText>
      <AppText style={styles.emptySubtitle} variant="caption">
        {t('tests.list.empty.subtitle')}
      </AppText>
    </View>
  );
};

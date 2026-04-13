import React from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppText } from '@/components/common/AppText/AppText';
import styles from './TestsListErrorState.styles';

type Props = {
  onRetry: () => void;
  onLogout: () => void;
};

export const TestsListErrorState = ({ onRetry, onLogout }: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.centerContent}>
      <AppText style={styles.errorTitle} variant="h2">
        {t('tests.list.error.title')}
      </AppText>
      <AppText style={styles.stateText} variant="body">
        {t('tests.list.error.subtitle')}
      </AppText>
      <Pressable onPress={onRetry} style={styles.retryButton}>
        <AppText style={styles.retryButtonText} variant="button">
          {t('tests.list.error.retry')}
        </AppText>
      </Pressable>
      <Pressable onPress={onLogout} style={styles.secondaryButton}>
        <AppText style={styles.secondaryButtonText} variant="button">
          {t('tests.list.error.logout')}
        </AppText>
      </Pressable>
    </View>
  );
};

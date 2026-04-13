import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SectionList,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppScreen } from '@/components/common/AppScreen/AppScreen';
import { AppText } from '@/components/common/AppText/AppText';
import { useAuth } from '@/contexts/AuthContext';
import { useTests } from '@/features/tests/hooks/useTests';
import {
  normalizeTests,
  TestListItem,
  TestSection,
} from '@/features/tests/utils/normalizeTests';
import { colors } from '@/theme';
import { TestCard } from '@/features/tests/components/TestCard/TestCard';
import { TestsListHeader } from '@/features/tests/components/TestsListHeader/TestsListHeader';
import { TestsListSectionHeader } from '@/features/tests/components/TestsListSectionHeader/TestsListSectionHeader';
import { TestsListEmptyState } from '@/features/tests/components/TestsListEmptyState/TestsListEmptyState';
import { TestsListErrorState } from '@/features/tests/components/TestsListErrorState/TestsListErrorState';
import styles from './TestsListScreen.styles';
import { filterTestSections } from '../utils/filterTestSections';

export const TestsListScreen = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading, isRefetching, refetch } = useTests();

  const sections = useMemo<TestSection[]>(() => {
    const apiData = data?.data;

    if (!apiData) {
      return [];
    }

    return filterTestSections(normalizeTests(apiData), searchQuery);
  }, [data?.data, searchQuery]);

  const totalCount = useMemo(
    () => sections.reduce((sum, s) => sum + s.data.length, 0),
    [sections],
  );

  const renderItem = ({ item }: { item: TestListItem }) => (
    <View style={styles.cardWrapper}>
      <TestCard
        category={item.category}
        durationLabel={item.durationLabel}
        feeLabel={item.feeLabel}
        subtitle={item.subtitle}
        title={item.title}
      />
    </View>
  );

  const renderSectionHeader = ({ section }: { section: TestSection }) => (
    <TestsListSectionHeader section={section} />
  );

  if (isLoading) {
    return (
      <AppScreen>
        <View style={styles.centerContent}>
          <ActivityIndicator color={colors.primary} size="large" />
          <AppText style={styles.stateText} variant="body">
            {t('tests.list.loading')}
          </AppText>
        </View>
      </AppScreen>
    );
  }

  if (error) {
    return (
      <AppScreen>
        <TestsListErrorState onLogout={logout} onRetry={refetch} />
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <SectionList
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isRefetching} />
        }
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        stickySectionHeadersEnabled={false}
        ListHeaderComponent={
          <TestsListHeader
            onLogout={logout}
            onSearchChange={setSearchQuery}
            searchQuery={searchQuery}
            totalCount={totalCount}
          />
        }
        ListEmptyComponent={<TestsListEmptyState />}
      />
    </AppScreen>
  );
};

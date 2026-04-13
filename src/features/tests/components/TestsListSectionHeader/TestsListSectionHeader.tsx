import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppText } from '@/components/common/AppText/AppText';
import { CATEGORY_CONFIG } from '@/features/tests/components/TestCard/TestCard.styles';
import { type TestSection } from '@/features/tests/utils/normalizeTests';
import styles from './TestsListSectionHeader.styles';

type Props = {
  section: TestSection;
};

export const TestsListSectionHeader = ({ section }: Props) => {
  const { color, icon, badgeBackgroundColor } =
    CATEGORY_CONFIG[section.category as 'moderated' | 'unmoderated'];

  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <View
          style={[
            styles.sectionIconBadge,
            { backgroundColor: badgeBackgroundColor },
          ]}
        >
          <Ionicons color={color} name={icon} size={15} />
        </View>
        <AppText style={styles.sectionTitle} variant="bodyMedium">
          {section.title}
        </AppText>
      </View>
      <View
        style={[
          styles.sectionCountBadge,
          { backgroundColor: badgeBackgroundColor },
        ]}
      >
        <AppText style={[styles.sectionCount, { color }]} variant="caption">
          {section.data.length}
        </AppText>
      </View>
    </View>
  );
};

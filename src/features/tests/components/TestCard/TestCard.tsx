import React from 'react';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { AppText } from '@/components/common/AppText/AppText';
import type { TestSectionKey } from '@/features/tests/utils/normalizeTests';

import { colors } from '@/theme';
import styles, { CATEGORY_CONFIG } from './TestCard.styles';

type TestCardProps = {
  title: string;
  subtitle: string;
  feeLabel: string;
  durationLabel: string;
  category: TestSectionKey;
};

export const TestCard = ({
  title,
  subtitle,
  feeLabel,
  durationLabel,
  category,
}: TestCardProps) => {
  const { color, icon, badgeBackgroundColor } = CATEGORY_CONFIG[category];

  return (
    <View style={styles.card}>
      <View style={[styles.accentBar, { backgroundColor: color }]} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.titleRow}>
            <Ionicons color={color} name={icon} size={14} />
            <AppText
              numberOfLines={1}
              style={styles.title}
              variant="bodyMedium"
            >
              {title}
            </AppText>
          </View>

          <View
            style={[
              styles.feeBadge,
              { borderColor: color, backgroundColor: badgeBackgroundColor },
            ]}
          >
            <AppText style={{ color }} variant="label">
              {feeLabel}
            </AppText>
          </View>
        </View>

        <AppText numberOfLines={1} style={styles.subtitle} variant="caption">
          {subtitle}
        </AppText>

        <View style={styles.metaRow}>
          <View style={styles.durationPill}>
            <Ionicons color={colors.textMuted} name="time-outline" size={13} />
            <AppText style={styles.durationText} variant="caption">
              {durationLabel}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

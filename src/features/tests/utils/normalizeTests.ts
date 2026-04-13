import type {
  StandardTest,
  TestsListData,
} from '@/features/tests/types/tests.types';

export type TestSectionKey = 'moderated' | 'unmoderated';

export type TestListItem = {
  id: string;
  category: TestSectionKey;
  title: string;
  subtitle: string;
  feeLabel: string;
  durationLabel: string;
  rawType: string;
  deviceName: string;
};

const SECTION_TITLES = {
  moderated: 'Moderated tests',
  unmoderated: 'Unmoderated tests',
} as const;

export type TestSection = {
  title: (typeof SECTION_TITLES)[TestSectionKey];
  category: TestSectionKey;
  data: TestListItem[];
};

const formatFee = (fee: number | null) =>
  fee == null ? 'Fee not available' : `$${fee}`;

const formatDuration = (minutes: number) => `${minutes} min`;

const createTestItem = ({
  test,
  id,
  category,
  title,
  subtitle,
}: {
  test: StandardTest;
  id: string;
  category: TestSectionKey;
  title: string;
  subtitle?: string;
}): TestListItem => ({
  id,
  category,
  title,
  subtitle:
    subtitle ??
    (test.os ? `${test.device_name} • ${test.os}` : test.device_name),
  feeLabel: formatFee(test.fee),
  durationLabel: formatDuration(test.testDuration),
  rawType: test.test_type,
  deviceName: test.device_name,
});

export const normalizeTests = (data: TestsListData): TestSection[] => {
  const unmoderated = [
    ...data.standard_tests.map(test =>
      createTestItem({
        test,
        id: `standard-${test.testsuite_id}`,
        category: 'unmoderated',
        title: 'Standard test',
      }),
    ),
    ...data.three_minute_tests.map(test =>
      createTestItem({
        test,
        id: `three-minute-${test.testsuite_id}`,
        category: 'unmoderated',
        title: '3-minute test',
      }),
    ),
    ...data.guerilla_tests.map(test =>
      createTestItem({
        test,
        id: `guerilla-${test.guerilla_test_id}-${test.testsuite_id}`,
        category: 'unmoderated',
        title: 'Ad hoc test',
        subtitle: test.device_name,
      }),
    ),
  ];

  const moderated = [
    ...data.mod_rut_tests.map(test =>
      createTestItem({
        test,
        id: `moderated-${test.mod_rut_id}-${test.testsuite_id}`,
        category: 'moderated',
        title: 'Moderated session',
        subtitle: test.device_name,
      }),
    ),
    ...data.mod_rut_taken_tests.map(test =>
      createTestItem({
        test,
        id: `taken-moderated-${test.mod_rut_slot_id}-${test.testsuite_id}`,
        category: 'moderated',
        title: 'Scheduled moderated session',
        subtitle: test.device_name,
      }),
    ),
  ];

  return [
    { title: SECTION_TITLES.moderated, category: 'moderated', data: moderated },
    {
      title: SECTION_TITLES.unmoderated,
      category: 'unmoderated',
      data: unmoderated,
    },
  ];
};

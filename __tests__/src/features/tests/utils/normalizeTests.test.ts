import { normalizeTests } from '@/features/tests/utils/normalizeTests';
import { TestType } from '@/features/tests/types/tests.types';

describe('normalizeTests', () => {
  it('groups tests into moderated and unmoderated sections', () => {
    const result = normalizeTests({
      screen_test_taken: 0,
      live_session_approved: 0,
      waiting_for_tester_screening_approval: 0,
      screener_test: null,
      standard_tests: [
        {
          testsuite_id: 101,
          testDuration: 20,
          requirements: null,
          extra_requirements: [],
          device_name: 'Phone',
          fee: 10,
          test_type: TestType.Moderated,
          os: 'both',
          camera: 0,
        },
      ],
      standard_tests_done: 0,
      three_minute_tests: [
        {
          testsuite_id: 102,
          testDuration: 5,
          requirements: null,
          extra_requirements: [],
          device_name: 'Desktop',
          fee: 2,
          test_type: TestType.Unmoderated,
          os: null,
          camera: 0,
        },
      ],
      three_minute_tests_done: 0,
      guerilla_tests: [],
      mod_rut_tests: [
        {
          testsuite_id: 103,
          testDuration: 15,
          requirements: null,
          extra_requirements: [],
          device_name: 'Phone',
          fee: 3,
          test_type: TestType.Moderated,
          camera: 0,
          mod_rut_id: 900,
        },
      ],
      mod_rut_taken_tests: [],
    });

    expect(result).toHaveLength(2);

    expect(result[0].title).toBe('Moderated tests');
    expect(result[0].data).toHaveLength(1);
    expect(result[0].data[0]).toMatchObject({
      id: 'moderated-900-103',
      title: 'Moderated session',
      subtitle: 'Phone',
      feeLabel: '$3',
      durationLabel: '15 min',
      rawType: 'moderated',
      deviceName: 'Phone',
    });

    expect(result[1].title).toBe('Unmoderated tests');
    expect(result[1].data).toHaveLength(2);
    expect(result[1].data[0]).toMatchObject({
      id: 'standard-101',
      title: 'Standard test',
      subtitle: 'Phone • both',
      feeLabel: '$10',
      durationLabel: '20 min',
    });
    expect(result[1].data[1]).toMatchObject({
      id: 'three-minute-102',
      title: '3-minute test',
      subtitle: 'Desktop',
      feeLabel: '$2',
      durationLabel: '5 min',
    });
  });

  it('returns fallback fee label when fee is null', () => {
    const result = normalizeTests({
      screen_test_taken: 0,
      live_session_approved: 0,
      waiting_for_tester_screening_approval: 0,
      screener_test: null,
      standard_tests: [
        {
          testsuite_id: 201,
          testDuration: 20,
          requirements: null,
          extra_requirements: [],
          device_name: 'Phone',
          fee: null,
          test_type: TestType.Unmoderated,
          os: 'both',
          camera: 0,
        },
      ],
      standard_tests_done: 0,
      three_minute_tests: [],
      three_minute_tests_done: 0,
      guerilla_tests: [],
      mod_rut_tests: [],
      mod_rut_taken_tests: [],
    });

    expect(result[1].data[0].feeLabel).toBe('Fee not available');
  });
});

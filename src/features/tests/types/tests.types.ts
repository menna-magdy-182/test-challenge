export enum TestType {
  Unmoderated = 'unmoderated',
  Moderated = 'moderated',
  Adhoc = 'adhoc',
}

export type BaseTest = {
  testsuite_id: number;
  testDuration: number;
  requirements: string | null;
  extra_requirements?: string[] | string | null;
  device_name: string;
  fee: number | null;
  test_type: TestType;
  camera?: number;
};

export type StandardTest = BaseTest & {
  os?: string | null;
};

export type ThreeMinuteTest = BaseTest & {
  os?: string | null;
};

export type GuerillaTest = BaseTest & {
  guerilla_test_id: number;
  guerilla_test_session_id: number;
  encryptedTesterLink: string;
};

export type ModeratedTest = BaseTest & {
  mod_rut_id: number;
};

export type TakenModeratedTest = BaseTest & {
  mod_rut_id: number;
  mod_rut_slot_id: number;
  tester_testsuite_id: number;
  start: number;
  testerTimeZone: string;
  timeStartDeduction: number;
  encryptedTesterLink: string;
  encrypted_existing_slot_id: string;
};

export type ScreenerTest = {
  testsuite_id: number;
  testDuration: number;
  fee: number | null;
  requirements: string | null;
  test_type: string;
  device_name: string;
  short_url?: string | null;
} | null;

export type TestsListData = {
  screen_test_taken: number;
  live_session_approved: number;
  waiting_for_tester_screening_approval: number;
  screener_test: ScreenerTest;
  standard_tests: StandardTest[];
  standard_tests_done: number;
  three_minute_tests: ThreeMinuteTest[];
  three_minute_tests_done: number;
  guerilla_tests: GuerillaTest[];
  mod_rut_tests: ModeratedTest[];
  mod_rut_taken_tests: TakenModeratedTest[];
};

export type TestsListResponse = {
  success: boolean | string;
  message: string;
  data: TestsListData;
};

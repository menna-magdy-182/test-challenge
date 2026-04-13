import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-mmkv');
jest.mock('react-native-safe-area-context', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const mockReact = require('react');
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 0, left: 0 }),
    useSafeAreaFrame: () => ({ x: 0, y: 0, width: 375, height: 812 }),
    SafeAreaInsetsContext: mockReact.createContext(null),
    SafeAreaFrameContext: mockReact.createContext(null),
  };
});

jest.mock('@/i18n', () => ({
  t: (key: string) => key,
}));

jest.mock('react-i18next', () => {
  const en = jest.requireActual<Record<string, unknown>>(
    './src/i18n/locales/en.json',
  );

  const getNestedValue = (
    obj: Record<string, unknown>,
    key: string,
  ): string => {
    const value = key.split('.').reduce<unknown>((acc, part) => {
      if (acc && typeof acc === 'object') {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, obj);
    return typeof value === 'string' ? value : key;
  };

  return {
    useTranslation: () => ({
      t: (key: string) => getNestedValue(en, key),
      i18n: { language: 'en', changeLanguage: jest.fn() },
    }),
    I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
    Trans: ({ children }: { children: React.ReactNode }) => children,
    initReactI18next: { type: '3rdParty', init: jest.fn() },
  };
});

jest.mock('react-native-vector-icons/Ionicons', () => 'Ionicons');

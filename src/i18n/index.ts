import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { storage } from '@/storage/mmkv';
import { storageKeys } from '@/storage/keys';
import en from './locales/en.json';
import de from './locales/de.json';

export const resources = {
  en: { translation: en },
  de: { translation: de },
} as const;

export type AppLanguage = keyof typeof resources;

const savedLanguage = storage.getString(storageKeys.language) as
  | AppLanguage
  | undefined;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng: string) => {
  storage.set(storageKeys.language, lng);
});

export default i18n;

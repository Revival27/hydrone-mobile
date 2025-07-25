import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationsEN from '../assets/translations/en.json';

const resources = {
  en: {
    translation: translationsEN,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  compatibilityJSON: 'v3',
  interpolation: { escapeValue: false },
});

export default i18n;

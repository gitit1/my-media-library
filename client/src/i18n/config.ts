import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import he from '../locales/he.json';
import { Languages } from '@types';

const { English, Hebrew } = Languages;

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		he: { translation: he },
	},
	fallbackLng: English,
	debug: false,
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;

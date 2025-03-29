'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import i18n from './config';
import { Languages, rtlLanguages } from '@types';

const { English, Hebrew } = Languages;

interface LanguageContextProps {
	language: string;
	toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextProps>({
	language: English,
	toggleLanguage: () => {},
});

export const LanguageProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const isValidLanguage = (lang: string): lang is Languages => {
		return Object.values(Languages).includes(lang as Languages);
	};

	const initialLanguage = isValidLanguage(i18n.language)
		? i18n.language
		: English;

	const [language, setLanguage] = useState<Languages>(initialLanguage);

	const toggleLanguage = () => {
		const newLang = language === English ? Hebrew : English;
		setLanguage(newLang);
		i18n.changeLanguage(newLang);
	};

	useEffect(() => {
		i18n.changeLanguage(language);
		document.documentElement.dir = rtlLanguages.includes(language)
			? 'rtl'
			: 'ltr';
	}, [language]);

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
};

export const useLanguage = () => useContext(LanguageContext);

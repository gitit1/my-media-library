'use client';

import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';
import { lightTheme, darkTheme } from './theme';
import { Theme } from '@types';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
	currentTheme: typeof lightTheme;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const { Light, Dark } = Theme;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(Light);

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme;
		if (storedTheme) {
			setTheme(storedTheme);
			document.documentElement.classList.add(storedTheme);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === Light ? Dark : Light;
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);

		document.documentElement.classList.remove(theme);
		document.documentElement.classList.add(newTheme);
	};

	const currentTheme = theme === Light ? lightTheme : darkTheme;

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, currentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

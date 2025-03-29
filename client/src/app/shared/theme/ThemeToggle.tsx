'use client';

import { MoonIcon, SunIcon } from '@icons';
import { useTheme } from '@theme';
import { Theme } from '@types';
import { Button } from '@ui';

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button onClick={toggleTheme}>
			{theme === Theme.Light ? <MoonIcon /> : <SunIcon />}
		</Button>
	);
};

export default ThemeToggle;

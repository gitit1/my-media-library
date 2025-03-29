'use client';

import { useTheme } from '@theme';

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
	const { currentTheme } = useTheme();

	return (
		<div
			style={{
				backgroundColor: currentTheme.colors.background,
				color: currentTheme.colors.text,
				minHeight: '100vh', // Ensure it covers the full viewport
			}}
		>
			{children}
		</div>
	);
};

export default ThemeWrapper;

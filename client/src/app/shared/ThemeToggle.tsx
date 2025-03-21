'use client';

import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme, currentTheme } = useTheme();
  
    return (
      <button
        onClick={toggleTheme}
        style={{
          backgroundColor: currentTheme.colors.primary,
          color: currentTheme.colors.text,
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          fontSize: '1rem',
        }}
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    );
  };

export default ThemeToggle;

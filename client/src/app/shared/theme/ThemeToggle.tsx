'use client';

import Button from '../components/Button';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
  
    return (
        <Button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
    );
  };

export default ThemeToggle;

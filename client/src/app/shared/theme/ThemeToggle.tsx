'use client';

import Button from '../components/Button';
import { useTheme } from './ThemeProvider';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggle;

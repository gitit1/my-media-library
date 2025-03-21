import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: boolean;
};

const Button = ({ children, onClick, className, type = 'button', icon = false }: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        ${theme === 'light' ? 'bg-primary-light hover:bg-secondary-light' : 'bg-primary-dark hover:bg-secondary-dark'}
        border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}
        text-white 
        ${icon ? 'p-1 h-8 w-8 rounded-full flex items-center justify-center' : 'px-4 py-2 rounded-md'}
        transition duration-200 
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
};

export default Button;

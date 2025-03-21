import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, className, type = 'button' }: ButtonProps) => {
  const { currentTheme, theme } = useTheme();

  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        backgroundColor: currentTheme.colors.primary,
        color: currentTheme.colors.text,
        padding: currentTheme.spacing.sm,
        borderRadius: '0.375rem',
        fontSize: currentTheme.typography.fontSize.base,
        transition: 'background-color 0.2s ease-in-out',
        border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`,
      }}
      className={className}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = currentTheme.colors.secondary)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = currentTheme.colors.primary)
      }
    >
      {children}
    </button>
  );
};

export default Button;

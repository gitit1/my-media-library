'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: 'close' | React.ReactNode;
  href?: string; // clearly added optional link prop
}

const Button = ({ children, onClick, className, type = 'button', icon, href }: ButtonProps) => {
  const { theme } = useTheme();

  const renderIcon = () => {
    if (icon === 'close') return <X />;
    if (icon) return icon;
    return null;
  };

  const buttonContent = (
    <>
      {renderIcon()}
      {children}
    </>
  );

  const buttonClasses = `inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 ${
    theme === 'dark'
      ? 'bg-gray-700 text-white hover:bg-gray-600'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  } ${className}`;

  return href ? (
    <Link href={href} className={buttonClasses}>
      {buttonContent}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={buttonClasses}>
      {buttonContent}
    </button>
  );
};

export default Button;

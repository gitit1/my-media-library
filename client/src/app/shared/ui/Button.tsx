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
  href?: string;
}

const Button = ({ children, onClick, className, type = 'button', icon, href }: ButtonProps) => {
  const { theme } = useTheme();

  const renderIcon = () => {
    if (icon === 'close') return <X />;
    if (icon) return icon;
    return null;
  };

  const buttonClasses = `inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-custom dark:border-custom-dark transition-colors duration-200 ${
    theme === 'dark'
      ? 'bg-gray-700 text-white hover:bg-gray-600'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
  } ${className}`;

  const buttonContent = (
    <>
      {renderIcon()}
      {children}
    </>
  );

  // Force `inline-block` to ensure border rendering
  if (href) {
    return (
      <Link href={href} className={`inline-block ${buttonClasses}`}>
        {buttonContent}
      </Link>
    );
  } else {
    return (
      <button type={type} onClick={onClick} className={`inline-block ${buttonClasses}`}>
        {buttonContent}
      </button>
    );
  }
};

export default Button;

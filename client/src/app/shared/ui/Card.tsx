'use client';

import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';

type CardProps = {
  children: ReactNode;
  title?: string;
  image?: string;
  onClick?: () => void;
  clickable?: boolean;
  className?: string;
};

const Card = ({ children, title, image, onClick, clickable = false, className }: CardProps) => {
  const { theme } = useTheme();

  return (
    <div
      onClick={onClick}
      className={`
        ${theme === 'light' ? 'bg-surface-light' : 'bg-surface-dark'}
        rounded-lg shadow-md overflow-hidden
        transition-all duration-200
        ${clickable ? 'cursor-pointer hover:scale-105' : ''}
        ${className}
      `}
    >
      {/* Render Image (Optional) */}
      {image && (
        <img
          src={image}
          alt={title || 'Card Image'}
          className="w-full h-40 object-cover"
        />
      )}

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        {title && (
          <div className="text-[18px] font-medium leading-none mb-2">
            {title}
          </div>
        )}

        {/* Children */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;

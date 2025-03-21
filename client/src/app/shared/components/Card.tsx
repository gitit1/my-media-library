'use client';

import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';

type CardProps = {
  children: ReactNode;
  title?: string;
  image?: string; // New prop for image
  className?: string;
};

const Card = ({ children, title, image, className }: CardProps) => {
  const { currentTheme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: currentTheme.colors.surface,
        color: currentTheme.colors.text,
        padding: currentTheme.spacing.md,
        borderRadius: '0.5rem',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${
          currentTheme.colors.background === '#F3F4F6'
            ? 'rgba(0, 0, 0, 0.1)'
            : 'rgba(255, 255, 255, 0.1)'
        }`,
        transition: 'transform 0.2s ease-in-out',
        cursor: 'pointer',
        overflow: 'hidden', // Ensures the image and content stay inside the border-radius
      }}
      className={className}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = 'scale(1.01)') // Zoom in
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = 'scale(1)')
      }
    >
      {image && (
        <img
          src={image}
          alt={title || 'Card Image'}
          style={{
            width: '100%',
            height: '180px',
            objectFit: 'cover', // Maintains aspect ratio and covers the area
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
          }}
        />
      )}
      <div style={{ padding: currentTheme.spacing.sm }}>
        {title && (
          <div
            style={{
              marginBottom: currentTheme.spacing.sm,
              fontSize: currentTheme.typography.fontSize.lg,
              fontWeight: currentTheme.typography.fontWeight.medium,
            }}
          >
            {title}
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Card;

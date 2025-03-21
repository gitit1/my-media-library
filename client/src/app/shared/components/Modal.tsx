'use client';

import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { currentTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{
          backgroundColor: currentTheme.colors.surface,
          color: currentTheme.colors.text,
          padding: currentTheme.spacing.lg,
          borderRadius: '0.5rem',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
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
        <button
          onClick={onClose}
          style={{
            marginTop: currentTheme.spacing.md,
            backgroundColor: currentTheme.colors.primary,
            color: currentTheme.colors.text,
            padding: currentTheme.spacing.sm,
            borderRadius: '0.375rem',
            border: `1px solid rgba(255, 255, 255, 0.3)`,
            fontSize: currentTheme.typography.fontSize.base,
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;

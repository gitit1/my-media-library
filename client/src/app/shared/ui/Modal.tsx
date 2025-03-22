'use client';

import { ReactNode } from 'react';
import { useTheme } from '../theme/ThemeProvider';
import Button from './Button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 
        bg-black bg-opacity-50 
        flex items-center justify-center 
        z-50
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          ${theme === 'light' ? 'bg-surface-light' : 'bg-surface-dark'}
          rounded-md shadow-lg 
          w-full max-w-md 
          p-6 
          transition-all 
          duration-200 
          transform 
          scale-100 
          hover:scale-105
        `}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between mb-4">
          {title && (
            <div className="text-[18px] font-medium leading-none">
              {title}
            </div>
          )}
          {/* Close Button Using Icon Mode */}
          <Button
            onClick={onClose}
            icon="close"
            className="
              bg-transparent 
              hover:bg-gray-200 
              dark:hover:bg-gray-700 
              text-gray-400 
              hover:text-gray-600 
              transition duration-200
              flex items-center justify-center
            "
          />
        </div>

        {/* Modal Body */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

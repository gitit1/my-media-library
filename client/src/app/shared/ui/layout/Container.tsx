import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

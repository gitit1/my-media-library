import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={`px-6 py-4 shadow bg-white dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}

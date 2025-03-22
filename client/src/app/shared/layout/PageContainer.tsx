import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`bg-gray-50 dark:bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className = '' }: PageContainerProps) {
  return (
    <div className={`flex flex-col min-h-screen w-full ${className}`}>
      {children}
    </div>
  );
}

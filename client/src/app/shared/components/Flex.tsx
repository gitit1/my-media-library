import { ReactNode } from 'react';

interface FlexProps {
  children: ReactNode;
  className?: string;
  align?: 'center' | 'start' | 'end';
  justify?: 'between' | 'center' | 'start' | 'end';
  gap?: number;
}

export default function Flex({
  children,
  className = '',
  align = 'center',
  justify = 'between',
  gap = 4,
}: FlexProps) {
  const alignClass = {
    center: 'items-center',
    start: 'items-start',
    end: 'items-end',
  }[align];

  const justifyClass = {
    between: 'justify-between',
    center: 'justify-center',
    start: 'justify-start',
    end: 'justify-end',
  }[justify];

  return (
    <div className={`flex ${alignClass} ${justifyClass} gap-${gap} ${className}`}>
      {children}
    </div>
  );
}

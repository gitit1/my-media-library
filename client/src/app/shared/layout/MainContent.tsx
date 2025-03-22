import { ReactNode } from 'react';
import Container from '../ui/Container';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <Container className="flex-1 mt-4 min-h-0">
      {children}
    </Container>
  );
}

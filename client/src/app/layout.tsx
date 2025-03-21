// layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './shared/ThemeProvider';
import ThemeToggle from './shared/ThemeToggle';

export const metadata: Metadata = {
  title: 'My Media Library',
  description: 'Manage TV series and movies seamlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

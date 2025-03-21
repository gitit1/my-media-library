import { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "./shared/theme/ThemeProvider";
import ThemeWrapper from "./shared/theme/ThemeWrapper";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Media Library',
  description: 'Manage and track your TV series',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <ThemeWrapper>  
            {children}
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

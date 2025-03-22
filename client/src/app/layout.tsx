import { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "./shared/theme/ThemeProvider";
import ThemeWrapper from "./shared/theme/ThemeWrapper";
import './globals.css';
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Header from "./shared/layout/Header";
import { SidebarProvider } from './shared/context/SidebarContext';
import LayoutContent from './shared/layout/LayoutContent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Media Library',
  description: 'Manage and track your TV series',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider>
          <ThemeWrapper>
            <LanguageProvider>
              <SidebarProvider>
                <Header />
                <LayoutContent>{children}</LayoutContent>
              </SidebarProvider>
            </LanguageProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

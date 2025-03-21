import { Metadata } from "next";
import { Inter } from 'next/font/google';
import { ThemeProvider } from "./shared/theme/ThemeProvider";
import ThemeWrapper from "./shared/theme/ThemeWrapper";
import './globals.css';
import { LanguageProvider } from "@/i18n/LanguageProvider";
import Header from "./shared/components/Header";

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
            <Header />
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

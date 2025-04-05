import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import { SearchProvider, SidebarProvider } from '@context';
import { ThemeProvider } from '@theme';
import ThemeWrapper from './shared/theme/ThemeWrapper';
import { Header, LayoutContent } from '@layout';
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
						<LanguageProvider>
							<SearchProvider>
								<SidebarProvider>
									<Header />
									<LayoutContent>{children}</LayoutContent>
								</SidebarProvider>
							</SearchProvider>
						</LanguageProvider>
					</ThemeWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}

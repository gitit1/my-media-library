'use client';

import Sidebar from './Sidebar';
import MainContent from './MainContent';
import { useSidebar } from '@context';
import { Container } from '@ui';
interface LayoutContentProps {
	children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
	const { isSidebarOpen } = useSidebar();

	return (
		<Container
			className={`flex h-screen pt-16 overflow-hidden transition-all duration-300 ${
				isSidebarOpen ? 'pl-56' : 'pl-0'
			}`}
		>
			<Sidebar />
			<MainContent>{children}</MainContent>
		</Container>
	);
}

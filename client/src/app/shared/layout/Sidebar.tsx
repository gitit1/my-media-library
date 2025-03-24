'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Container from '../ui/Container';
import { useSidebar } from '../context/SidebarContext';
import Flex from '../ui/Flex';

export default function Sidebar() {
	const { t } = useTranslation();
	const { isSidebarOpen } = useSidebar();

	const sidebarItems = [
		{ label: 'sidebar.dashboard', path: '/pages/series/dashboard' },
		{ label: 'sidebar.savedSeries', path: '/pages/series/saved' },
		{ label: 'sidebar.scanner', path: '/pages/series/scanner' },
		{ label: 'sidebar.unmatchedSeries', path: '/pages/series/unmatched' },
		{ label: 'sidebar.statistics', path: '/pages/statistics' },
		{ label: 'sidebar.settings', path: '/pages/settings' },
	];

	return (
		<Container
			className={`fixed top-16 left-0 w-56 h-full bg-gray-50 dark:bg-gray-800 border-r border-custom dark:border-custom-dark transition-transform duration-300 ${
				isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<Flex className="flex-col gap-2 p-4">
				{sidebarItems.map((item) => (
					<Link
						key={item.path}
						href={item.path}
						className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
					>
						{t(item.label)}
					</Link>
				))}
			</Flex>
		</Container>
	);
}

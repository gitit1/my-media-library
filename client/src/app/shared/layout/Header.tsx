'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { Button, Flex, Input, Typography } from '@ui';
import { PageContainer } from '@layout';
import {
	LanguagesIcon,
	PanelLeftCloseIcon,
	PanelLeftOpenIcon,
	SettingsIcon,
} from '@icons';
import { useSidebar } from '@context';
import { useLanguage } from '@i18n';
import ThemeToggle from '../theme/ThemeToggle';

export default function Header() {
	const { t } = useTranslation();
	const { language, toggleLanguage } = useLanguage();
	const { isSidebarOpen, toggleSidebar } = useSidebar();

	return (
		<PageContainer className="fixed top-0 left-0 right-0 z-20 border-b border-custom dark:border-custom-dark h-16 flex items-center mx-1">
			<Flex className="w-full justify-between">
				<Flex className="items-center gap-x-2">
					<Button onClick={toggleSidebar} className="mr-2">
						{isSidebarOpen ? (
							<PanelLeftCloseIcon size={24} />
						) : (
							<PanelLeftOpenIcon size={24} />
						)}
					</Button>
					<Link href="/">
						<Typography
							type="h1"
							className="cursor-pointer hover:text-gray-600 dark:hover:text-gray-300 transition leading-[64px]"
						>
							{t('dashboard.title')}
						</Typography>
					</Link>
				</Flex>
				<Flex gap={4}>
					<Input placeholder={t('dashboard.searchPlaceholder')} />
					<ThemeToggle />
					<Button onClick={toggleLanguage} icon={<LanguagesIcon />}>
						{language.toUpperCase()}
					</Button>
					<Button href="/pages/settings" icon={<SettingsIcon />}>
						{t('dashboard.settings')}
					</Button>
				</Flex>
			</Flex>
		</PageContainer>
	);
}

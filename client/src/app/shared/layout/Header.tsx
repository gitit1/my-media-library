'use client';

import '@/i18n/config';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Typography from '../ui/Typography';
import { Settings, Languages, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSidebar } from '../context/SidebarContext';
import Flex from '../ui/Flex';
import Link from 'next/link';
import PageContainer from '../layout/PageContainer';
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
            {isSidebarOpen ? <PanelLeftClose size={24} /> : <PanelLeftOpen size={24} />}
          </Button>
          <Link href="/pages/series/dashboard">
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
          <Button onClick={toggleLanguage} icon={<Languages />}>
            {language.toUpperCase()}
          </Button>
          <Button href="/pages/settings" icon={<Settings />}>
            {t('dashboard.settings')}
          </Button>
        </Flex>
      </Flex>
    </PageContainer>
  );
}

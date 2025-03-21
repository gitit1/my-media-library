'use client';

import '@/i18n/config';
import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";
import Typography from "@/app/shared/components/Typography";
import ThemeToggle from "@/app/shared/theme/ThemeToggle";
import { Languages, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/i18n/LanguageProvider';

export default function Header() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between px-6 py-4 shadow bg-white dark:bg-gray-800">
      <Typography type="h1">{t('dashboard.title')}</Typography>
      
      <div className="flex items-center gap-4">
        <Input placeholder="Search Series..." />
        <Button onClick={toggleLanguage} icon={<Languages />}>
          {language.toUpperCase()}
        </Button>
        <Button icon={<Settings />} href="/pages/settings" />
        <ThemeToggle />
      </div>
    </header>
  );
}

'use client';

import '@/i18n/config';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Languages, Settings } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import Button from "@/app/shared/components/Button";
import Input from "@/app/shared/components/Input";
import Typography from "@/app/shared/components/Typography";
import ThemeToggle from "@/app/shared/theme/ThemeToggle";
import Container from '@/app/shared/components/Container';
import Flex from '@/app/shared/components/Flex';

export default function Header() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();

  return (
    <Container>
      <Flex>
        <Link href="/">
          <Typography type="h1">{t('dashboard.title')}</Typography>
        </Link>
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
    </Container>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { FlexJustify } from '@types';
import { Button, Flex } from '@ui';

export default function HorizontalNav() {
	const router = useRouter();
	const { t } = useTranslation();

	return (
		<Flex
			justify={FlexJustify.Start}
			className="px-6 py-3 bg-gray-100 dark:bg-gray-800 shadow-sm"
		>
			<Button onClick={() => router.push('/pages/series/scanner')}>
				{t('dashboard.scanFilesystem')}
			</Button>
			<Button onClick={() => router.push('/pages/series/add')}>
				{t('dashboard.addNewSeries')}
			</Button>
			<Button onClick={() => router.push('/pages/settings/paths')}>
				{t('dashboard.addNewPath')}
			</Button>
		</Flex>
	);
}

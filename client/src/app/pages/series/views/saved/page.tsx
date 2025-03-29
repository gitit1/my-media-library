'use client';

import { useTranslation } from 'react-i18next';
import { TabsContent, TabsList, TabsRoot, TabsTrigger } from '@ui';
import AllSeriesTab from './components/Tabs/AllSeriesTab';
import CollectionsTab from './components/Tabs/CollectionsTab';

export default function SavedSeriesPage() {
	const { t } = useTranslation();

	return (
		<TabsRoot defaultValue="allSeries">
			<TabsList>
				<TabsTrigger value="allSeries">
					{t('series.allSeries')}
				</TabsTrigger>
				<TabsTrigger value="collections">
					{t('common.collections')}
				</TabsTrigger>
			</TabsList>

			<TabsContent value="allSeries">
				<AllSeriesTab />
			</TabsContent>

			<TabsContent value="collections">
				<CollectionsTab />
			</TabsContent>
		</TabsRoot>
	);
}

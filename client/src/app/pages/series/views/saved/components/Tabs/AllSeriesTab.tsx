'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardsView } from '@types';
import { mockSeriesData } from '@mocks';
import { Card, Container, Grid } from '@ui';
import FilterBar from '../FilterBar';

export default function AllSeriesTab() {
	const { t } = useTranslation();
	const [viewMode, setViewMode] = useState<CardsView>(CardsView.Grid);

	const seriesData = mockSeriesData;

	return (
		<Container className="w-[98%] mx-auto">
			<Card title={t('series.allTrackedSeries')} className="p-4">
				<FilterBar viewMode={viewMode} setViewMode={setViewMode} />

				{viewMode === CardsView.Grid ? (
					<Grid
						columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
						gap="gap-4"
					>
						{seriesData.map((series) => (
							<Card
								key={series.id}
								title={series.seriesName}
								image={series.poster}
								clickable
								onClick={() =>
									console.log('Clicked:', series.id)
								}
							>
								<></>
							</Card>
						))}
					</Grid>
				) : (
					<Container className="flex flex-col gap-4 p-4">
						{seriesData.map((series) => (
							<Card
								key={series.id}
								title={series.seriesName}
								image={series.poster}
								clickable
								variant={CardsView.List}
								className="w-[95%] mx-auto"
								onClick={() =>
									console.log('Clicked:', series.id)
								}
							>
								<></>
							</Card>
						))}
					</Container>
				)}
			</Card>
		</Container>
	);
}

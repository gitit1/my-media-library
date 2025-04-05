'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardsView } from '@/types';
import { mockSeriesData } from '@/mocks';
import { SeriesTable } from '@layout';
import { useSearch } from '@context';
import { Card, Container } from '@ui';
import FilterBar from '../FilterBar';
import SeriesCardView from '../SeriesCardView';

export default function AllSeriesTab() {
	const { t } = useTranslation();
	const { query: searchQuery } = useSearch();

	const [viewMode, setViewMode] = useState<CardsView>(CardsView.Grid);
	// const [sortBy, setSortBy] = useState<
	// 	'title' | 'year' | 'status' | 'lastAdded'
	// >('title');
	const [sortBy, setSortBy] = useState('title');
	const [seriesViewingState, setSeriesViewingState] = useState('all');

	useEffect(() => {
		console.log('searchQuery', searchQuery);
	}, [searchQuery]);

	const filteredSeries = mockSeriesData
		.filter((series) =>
			series.seriesName.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.sort((a, b) => {
			if (sortBy === 'title')
				return a.seriesName.localeCompare(b.seriesName);
			if (sortBy === 'year') return (b.year ?? 0) - (a.year ?? 0);
			// More sort conditions can be added here
			return 0;
		});

	return (
		<Container className="w-[98%] mx-auto">
			<FilterBar
				viewMode={viewMode}
				setViewMode={setViewMode}
				sortBy={sortBy}
				setSortBy={setSortBy}
				seriesViewingState={seriesViewingState}
				setSeriesViewingState={setSeriesViewingState}
			/>
			<Card
				title={t('series.allTrackedSeries')}
				className="p-4 overflow-visible z-50"
			>
				{viewMode === CardsView.Table ? (
					<SeriesTable data={filteredSeries} />
				) : (
					<SeriesCardView data={filteredSeries} viewMode={viewMode} />
				)}
			</Card>
		</Container>
	);
}

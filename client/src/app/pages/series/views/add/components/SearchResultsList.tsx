'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	CardsView,
	FlexJustify,
	SeriesDetails,
	ShortenedSeriesDetails,
} from '@types';
import { Card, Container, Flex, Typography } from '@ui';
import { getExtendedSeries } from '@services';

type Props = {
	results: ShortenedSeriesDetails[];
	isLoading: boolean;
};

export type ExtendedSeriesPreview = {
	thetvdb_id: number;
	name: { en: string; he: string };
	summary: { en: string; he: string };
	year: number | null;
	status: string;
	seasons: number;
	genres: string[];
	posters: { url: string }[];
	banners: { url: string }[];
	icons: { url: string }[];
};

type ExtendedResultsMap = {
	[key: number]: ExtendedSeriesPreview; // Or your trimmed version for `full=false`
};

export function SearchResultsList({ results, isLoading }: Props) {
	const { t, i18n } = useTranslation();
	const language = i18n.language;

	const [expandedId, setExpandedId] = useState<number | null>(null);
	const [extendedResults, setExtendedResults] = useState<ExtendedResultsMap>(
		{}
	);

	useEffect(() => {
		if (!expandedId || extendedResults[expandedId]) return;

		const fetchExtended = async () => {
			try {
				const data = await getExtendedSeries(expandedId);
				setExtendedResults((prev) => ({
					...prev,
					[expandedId]: data,
				}));
			} catch (err) {
				console.error('Failed to fetch extended series data:', err);
			}
		};

		fetchExtended();
	}, [expandedId, extendedResults]);

	if (isLoading)
		return (
			<Typography className="text-muted-foreground">
				{t('common.searching')}
			</Typography>
		);
	if (!results.length) return null;

	return (
		<div className="space-y-3 mt-6">
			{results.map((series) => {
				const extended = extendedResults[series.thetvdb_id];
				return (
					<Card
						key={series.thetvdb_id}
						title={`[${series.year}] ${
							series.name?.[language as 'en' | 'he']
						}`}
						variant={CardsView.List}
						image={series.poster || undefined}
						className="border cursor-pointer"
						onClick={() =>
							setExpandedId((prev) =>
								prev === series.thetvdb_id
									? null
									: series.thetvdb_id
							)
						}
					>
						<Container className="space-y-2">
							<Flex justify={FlexJustify.Between}>
								<Typography className="text-sm text-muted">
									{series.summary?.[language as 'en' | 'he']}
								</Typography>

								<Typography className="text-sm text-muted">
									{series.status}
								</Typography>
							</Flex>

							<Typography
								className={`text-sm font-medium ${
									series.alreadyExists
										? 'text-yellow-600'
										: 'text-green-600'
								}`}
							>
								{series.alreadyExists
									? 'Already in your library'
									: 'Available to add'}
							</Typography>

							{expandedId === series.thetvdb_id && (
								<Container className="mt-3 space-y-2">
									{extended ? (
										<>
											{extended.genres?.length > 0 && (
												<Typography className="text-sm text-muted-foreground">
													Genres:{' '}
													{extended.genres.join(', ')}
												</Typography>
											)}

											{typeof extended.seasons ===
												'number' && (
												<Typography className="text-sm text-muted-foreground">
													Seasons: {extended.seasons}
												</Typography>
											)}

											{extended.posters?.length > 0 && (
												<Flex className="gap-2 overflow-x-auto">
													{extended.posters
														.slice(0, 3)
														.map(
															(
																poster: any,
																index: number
															) => (
																<img
																	key={index}
																	src={
																		poster.image
																	}
																	alt={`Poster ${
																		index +
																		1
																	}`}
																	className="h-32 rounded-md shadow"
																/>
															)
														)}
												</Flex>
											)}
										</>
									) : (
										<Typography className="text-sm text-muted">
											Loading...
										</Typography>
									)}
								</Container>
							)}
						</Container>
					</Card>
				);
			})}
		</div>
	);
}

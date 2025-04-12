'use client';

import { useTranslation } from 'react-i18next';
import { CardsView, ShortenedSeriesDetails } from '@types';
import { Card, Container, Typography } from '@ui';

type Props = {
	results: ShortenedSeriesDetails[];
	isLoading: boolean;
};

export function SearchResultsList({ results, isLoading }: Props) {
	const { t, i18n } = useTranslation();
	const language = i18n.language;

	if (isLoading)
		return (
			<Typography className="text-muted-foreground">
				{t('common.searching')}
			</Typography>
		);
	if (!results.length) return null;

	return (
		<div className="space-y-3 mt-6">
			{results.map((series) => (
				<Card
					key={series.thetvdb_id}
					title={series.name?.[language as 'en' | 'he']}
					variant={CardsView.List}
					image={series.poster || undefined}
					className="border"
				>
					<Container className="space-y-2">
						{series.year && (
							<Typography className="text-sm text-muted-foreground">
								Year: {series.year}
							</Typography>
						)}

						<Typography className="text-sm text-muted">
							{series.summary?.[language as 'en' | 'he']}
						</Typography>

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
					</Container>
				</Card>
			))}
		</div>
	);
}

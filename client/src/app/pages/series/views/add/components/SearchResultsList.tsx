'use client';

import { CardsView } from '@types';
import { Card } from '@ui';

type SeriesResult = {
	tvdb_id: number;
	name: string;
	year?: number;
	alreadyExists: boolean;
	poster: string;
};

type Props = {
	results: SeriesResult[];
	isLoading: boolean;
};

export function SearchResultsList({ results, isLoading }: Props) {
	if (isLoading) return <p className="text-muted-foreground">Searching...</p>;
	if (!results.length) return null;

	return (
		<div className="space-y-3 mt-6">
			{results.map((series) => (
				<Card
					key={series.tvdb_id}
					title={series.name}
					variant={CardsView.List}
					image={series.poster || undefined}
					className="border"
				>
					<div className="text-sm text-muted-foreground">
						{series.year && `Year: ${series.year}`}
					</div>

					<div
						className={`text-sm font-medium ${
							series.alreadyExists
								? 'text-yellow-600'
								: 'text-green-600'
						}`}
					>
						{series.alreadyExists
							? 'Already in your library'
							: 'Available to add'}
					</div>
				</Card>
			))}
		</div>
	);
}

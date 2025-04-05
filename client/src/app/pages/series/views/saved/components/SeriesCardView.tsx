'use client';

import { useRouter } from 'next/navigation';
import { hasMissingEpisodes, hasMissingSubtitles } from '@utils';
import { CardsView, SeriesDetails } from '@types';
import { Card, Container, Grid } from '@ui';

interface Props {
	data: SeriesDetails[];
	viewMode: CardsView;
}

export default function SeriesCardView({ data, viewMode }: Props) {
	const router = useRouter();

	const flags = (series: SeriesDetails) => (
		<>
			{hasMissingEpisodes(series) && (
				<span className="text-orange-600 mr-2 text-lg">●</span>
			)}
			{hasMissingSubtitles(series) && (
				<span className="text-purple-600 text-lg">●</span>
			)}
		</>
	);
	if (viewMode === CardsView.List) {
		return (
			<Container className="flex flex-col gap-4 p-4">
				{data.map((series) => (
					<Card
						key={series.id}
						title={series.seriesName}
						image={series.poster}
						clickable
						onClick={() => router.push(`/series/${series.id}`)}
						variant={CardsView.List}
						className="w-[95%] mx-auto"
					>
						<>{flags(series)}</>
					</Card>
				))}
			</Container>
		);
	}

	return (
		<Grid columns="grid-cols-1 sm:grid-cols-2 md:grid-cols-3" gap="gap-4">
			{data.map((series) => (
				<Card
					key={series.id}
					title={series.seriesName}
					image={series.poster}
					clickable
					onClick={() => router.push(`/series/${series.id}`)}
				>
					<>{flags(series)}</>
				</Card>
			))}
		</Grid>
	);
}

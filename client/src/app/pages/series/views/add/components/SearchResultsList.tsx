'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
	BtnVariant,
	CardsView,
	FlexJustify,
	ShortenedSeriesDetails,
} from '@types';
import { Button, Card, Container, Flex, Typography } from '@ui';
import ConfirmationModal from './ConfirmationModal/ConfirmationModal';

type Props = {
	results: ShortenedSeriesDetails[];
	isLoading: boolean;
};

export function SearchResultsList({ results, isLoading }: Props) {
	const { t, i18n } = useTranslation();
	const language = i18n.language;
	const [confirmationModeId, setConfirmationModeId] = useState<number | null>(
		null
	);

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
					title={`[${series.year}] ${
						series.seriesName?.[language as 'en' | 'he']
					}`}
					variant={CardsView.List}
					image={series.poster || undefined}
					className="border"
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

						<Button
							variant={BtnVariant.Default}
							onClick={() =>
								setConfirmationModeId(series.thetvdb_id)
							}
						>
							{t('series.save')}
						</Button>

						<ConfirmationModal
							isOpen={confirmationModeId === series.thetvdb_id}
							onClose={() => setConfirmationModeId(null)}
							seriesId={series.thetvdb_id}
						/>
					</Container>
				</Card>
			))}
		</div>
	);
}

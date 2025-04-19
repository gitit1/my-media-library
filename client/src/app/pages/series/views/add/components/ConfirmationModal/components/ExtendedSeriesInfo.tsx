'use client';

import { Typography, Flex } from '@ui';
import { FlexJustify } from '@types';
import { useTranslation } from 'react-i18next';

type Props = {
	year: number | null;
	status: string;
	genres: string[];
	summary: { en: string; he: string };
	language: 'en' | 'he';
};

export default function ExtendedSeriesInfo({
	year,
	status,
	genres,
	summary,
	language,
}: Props) {
	const { t } = useTranslation();

	return (
		<div className="space-y-2">
			{summary?.[language] && (
				<Typography className="text-sm text-muted-foreground">
					{summary[language]}
				</Typography>
			)}

			<Flex justify={FlexJustify.Between}>
				{year && (
					<Typography className="text-sm font-medium">
						{t('series.year')}: {year}
					</Typography>
				)}

				{status && (
					<Typography className="text-sm font-medium">
						{t('series.status')}: {status}
					</Typography>
				)}
			</Flex>

			{genres?.length > 0 && (
				<Typography className="text-sm text-muted-foreground">
					{t('series.genres')}: {genres.join(', ')}
				</Typography>
			)}
		</div>
	);
}

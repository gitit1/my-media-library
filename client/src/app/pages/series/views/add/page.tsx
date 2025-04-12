'use client';

import { useState } from 'react';
import { Button, Container, Flex, Input, Typography } from '@ui';
import { TypographyType } from '@types';
import { searchSeries } from '@services';
import { useTranslation } from 'react-i18next';

export default function AddSeriesPage() {
	const { t } = useTranslation();

	const [query, setQuery] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<any[]>([]);

	const handleSearch = async () => {
		if (!query) return;
		setIsLoading(true);

		try {
			const data = await searchSeries(query);
			setResults(data);
		} catch (error) {
			console.error('Search failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Container className="p-4 space-y-4">
			<Typography type={TypographyType.H4}>
				{t('dashboard.addNewSeries')}
			</Typography>

			<Flex className="flex gap-2">
				<Input
					placeholder={t('series.search')}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				<Button onClick={handleSearch} disabled={isLoading}>
					{isLoading ? t('common.searching') : t('common.search')}
				</Button>
			</Flex>

			{/* We’ll add results display in the next step */}
		</Container>
	);
}

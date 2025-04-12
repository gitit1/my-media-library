'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';
import { Container, Flex, Input, Typography } from '@ui';
import {
	FlexAlign,
	FlexDirection,
	FlexJustify,
	ShortenedSeriesDetails,
	TypographyType,
} from '@types';
import { searchSeries } from '@services';
import { SearchResultsList } from './components/SearchResultsList';

export default function AddSeriesPage() {
	const { t } = useTranslation();

	const [query, setQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [rawResults, setRawResults] = useState<ShortenedSeriesDetails[]>([]);
	const [results, setResults] = useState<ShortenedSeriesDetails[]>([]);

	useEffect(() => {
		const debouncedSearch = debounce(async () => {
			if (query.length < 2) {
				setResults([]);
				setRawResults([]);
				return;
			}

			// if we already fetched raw results, just filter them
			if (rawResults.length > 2) {
				const filtered = rawResults.filter((item) => {
					const queryLower = query.toLowerCase();
					return (
						item.name.en.toLowerCase().includes(queryLower) ||
						item.name.he.toLowerCase().includes(queryLower)
					);
				});
				setResults(filtered);
				return;
			}

			// else, call the API
			setIsLoading(true);
			try {
				const data = await searchSeries(query);

				const mapped = data.map((item: ShortenedSeriesDetails) => ({
					thetvdb_id: item.thetvdb_id,
					name: item.name,
					summary: item.summary,
					year: item.year ?? null,
					poster: item.poster || '',
					alreadyExists: item.alreadyExists ?? false,
				}));

				setRawResults(mapped);
				setResults(mapped);
			} catch (e) {
				console.error(e);
			} finally {
				setIsLoading(false);
			}
		}, 100);

		debouncedSearch();

		return () => {
			debouncedSearch.cancel();
		};
	}, [query]);

	return (
		<Container className="p-4 space-y-4">
			<Typography type={TypographyType.H4}>
				{t('dashboard.addNewSeries')}
			</Typography>

			<Flex
				gap={2}
				align={FlexAlign.Start}
				justify={FlexJustify.Start}
				direction={FlexDirection.Col}
			>
				<Input
					placeholder={t('series.search')}
					value={query}
					onChange={(e) => setQuery(e.target.value)}
				/>
				{query.length >= 0 && query.length < 2 && (
					<Typography type={TypographyType.P}>
						Please type at least 2 characters to start searching.
					</Typography>
				)}
			</Flex>

			<SearchResultsList results={results} isLoading={isLoading} />
		</Container>
	);
}

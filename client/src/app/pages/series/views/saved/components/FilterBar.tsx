'use client';

import { useTranslation } from 'react-i18next';
import {
	BtnSize,
	BtnVariant,
	CardsView,
	FlexAlign,
	FlexJustify,
} from '@/types/ui';
import { Button, Flex, Select } from '@/app/shared/ui';
import { GridIcon, ListIcon, TableIcon } from '@icons';
interface FilterBarProps {
	viewMode: CardsView;
	setViewMode: (mode: CardsView) => void;
	sortBy: string;
	setSortBy: (value: string) => void;
	seriesViewingState: string;
	setSeriesViewingState: (value: string) => void;
}

export default function FilterBar({
	viewMode,
	setViewMode,
	sortBy,
	setSortBy,
	seriesViewingState,
	setSeriesViewingState,
}: FilterBarProps) {
	const { t } = useTranslation();

	return (
		<Flex
			align={FlexAlign.Center}
			justify={FlexJustify.Between}
			gap={4}
			className="mb-4 flex-wrap"
		>
			{/* Sort Dropdown */}
			<Flex gap={2}>
				<label className="text-sm font-medium">
					{t('common.sortBy')}:
				</label>
				<Select
					value={sortBy}
					onChange={setSortBy}
					options={[
						{ value: 'title', label: t('series.title') },
						{ value: 'year', label: t('series.year') },
						{ value: 'status', label: t('series.seriesStatus') },
						{
							value: 'lastAdded',
							label: t('series.lastEpisodeAdded'),
						},
					]}
				/>
				<label className="text-sm font-medium">
					{t('seriesViewingState.viewingState')}:
				</label>
				<Select
					value={seriesViewingState}
					onChange={setSeriesViewingState}
					options={[
						{ value: 'all', label: t('seriesViewingState.all') },
						{
							value: 'endedWatched',
							label: t('seriesViewingState.endedWatched'),
						},
						{
							value: 'endedNtC',
							label: t('seriesViewingState.endedNtC'),
						},
						{
							value: 'endedWtW',
							label: t('seriesViewingState.endedWtW'),
						},
						{
							value: 'endedSF',
							label: t('seriesViewingState.endedSF'),
						},
						{
							value: 'runningWatching',
							label: t('seriesViewingState.runningWatching'),
						},
						{
							value: 'runningNtC',
							label: t('seriesViewingState.runningNtC'),
						},
						{
							value: 'runningWtW',
							label: t('seriesViewingState.runningWtW'),
						},
						{
							value: 'runningSF',
							label: t('seriesViewingState.runningSF'),
						},
					]}
				/>
			</Flex>

			{/* View Mode Toggle */}
			<Flex gap={2}>
				<Button
					variant={
						viewMode === CardsView.Grid
							? BtnVariant.Default
							: BtnVariant.Outline
					}
					size={BtnSize.Small}
					onClick={() => setViewMode(CardsView.Grid)}
				>
					<GridIcon />
					{t('common.grid')}
				</Button>
				<Button
					variant={
						viewMode === CardsView.List
							? BtnVariant.Default
							: BtnVariant.Outline
					}
					size={BtnSize.Small}
					onClick={() => setViewMode(CardsView.List)}
				>
					<ListIcon />
					{t('common.list')}
				</Button>
				<Button
					variant={
						viewMode === CardsView.Table
							? BtnVariant.Default
							: BtnVariant.Outline
					}
					size={BtnSize.Small}
					onClick={() => setViewMode(CardsView.Table)}
				>
					<TableIcon />
					{t('common.table')}
				</Button>
			</Flex>
		</Flex>
	);
}

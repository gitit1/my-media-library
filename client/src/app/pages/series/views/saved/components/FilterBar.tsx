'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BtnSize, BtnVariant, CardsView, FlexJustify } from '@types';
import {
	Button,
	Container,
	Flex,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui';
import { GridIcon, ListIcon, TableIcon } from '@icons';

interface FilterBarProps {
	viewMode: CardsView;
	setViewMode: (mode: CardsView) => void;
}

export default function FilterBar({ viewMode, setViewMode }: FilterBarProps) {
	const { t } = useTranslation();
	const [sortBy, setSortBy] = useState('title');

	return (
		<Container className="mb-4">
			<Flex gap={4} className="flex-wrap" justify={FlexJustify.Between}>
				{/* Sort Dropdown */}
				<Flex gap={2}>
					<span className="text-sm font-medium">
						{t('common.sortBy')}:
					</span>
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder={t('common.sortBy')} />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="title">
								{t('series.title')}
							</SelectItem>
							<SelectItem value="year">
								{t('series.year')}
							</SelectItem>
							<SelectItem value="status">
								{t('series.seriesStatus')}
							</SelectItem>
							<SelectItem value="lastAdded">
								{t('series.lastEpisodeAdded')}
							</SelectItem>
						</SelectContent>
					</Select>
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
						<GridIcon className="w-4 h-4 mr-1" />
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
						<ListIcon className="w-4 h-4 mr-1" />
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
						<TableIcon className="w-4 h-4 mr-1" />
						{t('common.table')}
					</Button>
				</Flex>
			</Flex>
		</Container>
	);
}

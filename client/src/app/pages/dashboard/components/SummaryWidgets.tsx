'use client';

import { useState, useEffect } from 'react';
import Card from '@/app/shared/ui/Card';
import i18n from '@/i18n/config';
import Flex from '@/app/shared/ui/Flex';
import Typography from '@/app/shared/ui/Typography';
import Container from '@/app/shared/ui/Container';
import Button from '@/app/shared/ui/Button';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface Stat {
	id: string;
	value: number;
	[key: `label_${string}`]: string;
}

interface List {
	id: string;
	data: Stat[];
	[key: `name_${string}`]: string;
}

export default function SummaryWidgets() {
	const { i18n } = useTranslation();
	const [selectedTags, setSelectedTags] = useState<string[]>([]);

	const appStats: Stat[] = [
		{
			id: 'app-total-missing-episodes',
			label_en: 'Missing Episodes',
			label_he: 'פרקים חסרים',
			value: 45,
		},
		{
			id: 'app-total-missing-subs',
			label_en: 'Missing Subtitles',
			label_he: 'כתוביות חסרות',
			value: 250,
		},
	];

	const seriesStateCollections: Stat[] = [
		{
			id: 'series-state-1',
			label_en: 'Total Series',
			label_he: 'סך הכל סדרות שמורות',
			value: 42,
		},
		{
			id: 'series-state-2',
			label_en: 'Ended Series',
			label_he: 'סדרות שהסתיימו',
			value: 272,
		},
		{
			id: 'series-state-3',
			label_en: 'Running Series',
			label_he: 'סדרות רצות',
			value: 111,
		},
	];

	const viewingStateCollections: Stat[] = [
		{
			id: 'viewing-state-001',
			label_en: 'Ended - Watched',
			label_he: 'סדרה שהסתיימה - צפיתי',
			value: 12,
		},
		{
			id: 'viewing-state-002',
			label_en: 'Ended - NtC',
			label_he: 'סדרה שהסתיימה - צריכה להמשיך',
			value: 22,
		},
		{
			id: 'viewing-state-003',
			label_en: 'Ended - WtW',
			label_he: 'סדרה שהסתיימה - רוצה לראות',
			value: 65,
		},
		{
			id: 'viewing-state-004',
			label_en: 'Ended - SF',
			label_he: 'סדרה שהסתיימה - הפסקתי לעקוב',
			value: 8,
		},
		{
			id: 'viewing-state-005',
			label_en: 'Running - Watching',
			label_he: 'סדרה שרצה - צופה',
			value: 34,
		},
		{
			id: 'viewing-state-006',
			label_en: 'Running - NtC',
			label_he: 'סדרה שרצה - צריכה להמשיך',
			value: 76,
		},
		{
			id: 'viewing-state-007',
			label_en: 'Running - WtW',
			label_he: 'סדרה שרצה - רוצה לראות',
			value: 55,
		},
		{
			id: 'viewing-state-008',
			label_en: 'Running - SF',
			label_he: 'סדרה שרצה - הפסקתי לעקוב',
			value: 12,
		},
	];

	const seriesTypes: Stat[] = [
		{ id: 'type-001', label_en: 'Series', label_he: 'סדרה', value: 30 },
		{
			id: 'type-002',
			label_en: 'Cartoon',
			label_he: 'סרט מצויר',
			value: 5,
		},
		{
			id: 'type-003',
			label_en: 'Israeli Show',
			label_he: 'תוכנית ישראלית',
			value: 4,
		},
		{
			id: 'type-004',
			label_en: 'Telenovela',
			label_he: 'טלנובלה',
			value: 3,
		},
		{
			id: 'type-005',
			label_en: 'Spanish Series',
			label_he: 'סדרה ספרדית',
			value: 2,
		},
		{
			id: 'type-006',
			label_en: 'Japanese Series',
			label_he: 'סדרה יפנית',
			value: 1,
		},
		{ id: 'type-007', label_en: 'Other', label_he: 'אחר', value: 5 },
	];

	const tagCategories: List[] = [
		{
			id: 'seriesState',
			name_en: 'Series Status',
			name_he: 'סטטוס סדרה',
			data: seriesStateCollections,
		},
		{
			id: 'seriesTypes',
			name_en: 'Series Types',
			name_he: 'סוגי סדרות',
			data: seriesTypes,
		},
		{
			id: 'viewingState',
			name_en: 'Viewing Status',
			name_he: 'סטטוס צפייה',
			data: viewingStateCollections,
		},
		{
			id: 'appStats',
			name_en: 'App Tracking Status',
			name_he: 'סטטוס מעקב אפליקציה',
			data: appStats,
		},
	];

	const getTagColor = (category: string) => {
		switch (category) {
			case 'appStats':
				return '#5B9BD5'; // Blue
			case 'seriesState':
				return '#4CAF50'; // Green
			case 'viewingState':
				return '#FFEB3B'; // Yellow
			case 'seriesTypes':
				return '#FF5722'; // Red
			default:
				return '#BDBDBD'; // Default grey
		}
	};

	const handleTagClick = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag)
				? prev.filter((item) => item !== tag)
				: [...prev, tag]
		);
	};

	console.log('Current language:', i18n.language);
	return (
		<Flex className="flex-col gap-1">
			{tagCategories.map((category) => (
				<Container
					key={category.name_en}
					className="flex gap-1 mb-2 justify-start items-start w-full"
				>
					<Typography type="h6" className="text-md font-semibold">
						{category[`name_${i18n.language}`] || category.name_en}
					</Typography>
					<Container className="flex gap-2">
						{category.data.map((tag) => (
							<Button
								key={tag.label_en}
								onClick={() => handleTagClick(tag.label_en)}
								className="bg-gray-200 rounded px-3 py-1 text-xs"
								style={{
									backgroundColor: getTagColor(category.id),
								}}
							>
								{tag[`label_${i18n.language}`] || tag.label_en}{' '}
								({tag.value})
							</Button>
						))}
					</Container>
				</Container>
			))}
		</Flex>
	);
}

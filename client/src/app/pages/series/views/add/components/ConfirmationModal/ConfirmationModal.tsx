'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Flex, Modal, Loader } from '@ui';
import { BtnVariant, ExtendedSeriesDetails, FlexJustify } from '@types';
import { getExtendedSeries } from '@services';

import ViewingStateSelector from './components/ViewingStateSelector';
import SavedToggle from './components/SavedToggle';
import PathSelector from './components/PathSelector';
import FavoritesToggle from './components/FavoritesToggle';
import ExtendedSeriesInfo from './components/ExtendedSeriesInfo';

type Props = {
	isOpen: boolean;
	onClose: () => void;
	seriesId: number;
};

export default function ConfirmationModal({
	isOpen,
	onClose,
	seriesId,
}: Props) {
	const { t, i18n } = useTranslation();
	const language = i18n.language as 'en' | 'he';

	const [viewingState, setViewingState] = useState('');
	const [isSaved, setIsSaved] = useState(true);
	const [favorite, setFavorite] = useState(false);
	const [selectedPathId, setSelectedPathId] = useState('');
	const [extended, setExtended] = useState<ExtendedSeriesDetails | null>(
		null
	);

	useEffect(() => {
		// console.log('extended 1', extended);
		if (!isOpen || extended) return;

		const fetchExtended = async () => {
			try {
				const data = await getExtendedSeries(seriesId);
				setExtended(data);
				console.log('extended', data);
			} catch (err) {
				console.error('Failed to load extended series data:', err);
			}
		};

		fetchExtended();
	}, [isOpen, extended, seriesId]);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={extended?.seriesName?.[language as 'en' | 'he']}
		>
			{!extended ? (
				<Flex justify={FlexJustify.Center} className="py-8">
					<Loader size="lg" />
				</Flex>
			) : (
				<Container className="space-y-4">
					<ExtendedSeriesInfo
						year={extended.year}
						status={extended.status}
						genres={extended.genres}
						summary={extended.summary}
						language={language}
					/>

					<ViewingStateSelector
						value={viewingState}
						onChange={setViewingState}
					/>

					<SavedToggle value={isSaved} onChange={setIsSaved} />

					{isSaved && (
						<PathSelector
							value={selectedPathId}
							onChange={setSelectedPathId}
							paths={[
								{ value: 'path1', label: 'E:\\Running Series' },
								{ value: 'path2', label: 'F:\\Archived Shows' },
							]}
						/>
					)}

					<FavoritesToggle value={favorite} onChange={setFavorite} />

					<Flex justify={FlexJustify.Between} className="pt-4">
						<Button variant={BtnVariant.Outline} onClick={onClose}>
							{t('common.cancel')}
						</Button>
						<Button variant={BtnVariant.Default}>
							{t('common.save')}
						</Button>
					</Flex>
				</Container>
			)}
		</Modal>
	);
}

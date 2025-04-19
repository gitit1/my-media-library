'use client';

import { Button, Flex, Typography } from '@ui';
import { BtnVariant, FlexJustify } from '@types';
import { useTranslation } from 'react-i18next';

type Props = {
	value: boolean;
	onChange: (val: boolean) => void;
};

export default function FavoritesToggle({ value, onChange }: Props) {
	const { t } = useTranslation();

	return (
		<Flex justify={FlexJustify.Between}>
			<Typography className="text-sm font-medium">
				{t('series.addToFavorites')}
			</Typography>
			<Button
				variant={value ? BtnVariant.Default : BtnVariant.Outline}
				onClick={() => onChange(!value)}
				className="text-sm"
			>
				{value ? t('common.yes') : t('common.no')}
			</Button>
		</Flex>
	);
}

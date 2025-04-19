'use client';

import { viewingStates } from '@types';
import { Select } from '@ui';
import { useTranslation } from 'react-i18next';

export type ViewingState = string;

type Props = {
	value: ViewingState;
	onChange: (val: ViewingState) => void;
};

export default function ViewingStateSelector({ value, onChange }: Props) {
	const { t } = useTranslation();

	return (
		<Select
			label={t('series.selectViewingState')}
			value={value}
			onChange={onChange}
			options={[
				{ value: '', label: t('common.select') },
				...viewingStates,
			]}
		/>
	);
}

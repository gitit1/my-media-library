'use client';

import { Select } from '@ui';
import { useTranslation } from 'react-i18next';

type Props = {
	value: string;
	onChange: (val: string) => void;
	paths: { value: string; label: string }[];
};

export default function PathSelector({ value, onChange, paths }: Props) {
	const { t } = useTranslation();

	return (
		<Select
			label={t('series.selectPath')}
			value={value}
			onChange={onChange}
			options={[{ value: '', label: t('common.select') }, ...paths]}
			className="pt-2"
		/>
	);
}

'use client';

import { useId } from 'react';
import { cn } from '@utils';

interface SelectProps {
	label?: string;
	value: string;
	onChange: (value: string) => void;
	options: { value: string; label: string }[];
	className?: string;
}

export default function Select({
	label,
	value,
	onChange,
	options,
	className = '',
}: SelectProps) {
	const id = useId();

	return (
		<div className={cn('flex flex-col gap-1', className)}>
			{label && (
				<label htmlFor={id} className="text-sm font-medium">
					{label}
				</label>
			)}
			<select
				id={id}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="rounded border px-3 py-1.5 text-sm shadow-sm focus:outline-none bg-white dark:bg-gray-800 dark:text-white"
			>
				{options.map((opt) => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
		</div>
	);
}

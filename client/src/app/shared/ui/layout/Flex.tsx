import { ReactNode } from 'react';
import { FlexAlign, FlexJustify } from '@types';

interface FlexProps {
	children: ReactNode;
	className?: string;
	align?: FlexAlign;
	justify?: FlexJustify;
	gap?: number;
}

export default function Flex({
	children,
	className = '',
	align = FlexAlign.Center,
	justify = FlexJustify.Between,
	gap = 4,
}: FlexProps) {
	const alignClass = {
		center: 'items-center',
		start: 'items-start',
		end: 'items-end',
	}[align];

	const justifyClass = {
		between: 'justify-between',
		center: 'justify-center',
		start: 'justify-start',
		end: 'justify-end',
	}[justify];

	return (
		<div
			className={`flex ${alignClass} ${justifyClass} gap-${gap} ${className}`}
		>
			{children}
		</div>
	);
}

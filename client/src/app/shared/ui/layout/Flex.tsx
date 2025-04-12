import { ReactNode } from 'react';
import { FlexAlign, FlexDirection, FlexJustify } from '@types';

interface FlexProps {
	children: ReactNode;
	className?: string;
	align?: FlexAlign;
	justify?: FlexJustify;
	direction?: FlexDirection;
	gap?: number;
}

export default function Flex({
	children,
	className = '',
	align = FlexAlign.Center,
	justify = FlexJustify.Between,
	direction = FlexDirection.Row,
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

	const directionClass = direction === 'col' ? 'flex-col' : 'flex-row';

	return (
		<div
			className={`flex ${directionClass} ${alignClass} ${justifyClass} gap-${gap} ${className}`}
		>
			{children}
		</div>
	);
}

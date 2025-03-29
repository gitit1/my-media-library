'use client';

import { cn } from '@utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	columns?: string;
	gap?: string;
	className?: string;
}

const Grid = ({
	children,
	columns = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
	gap = 'gap-4',
	className,
	...props
}: GridProps) => {
	return (
		<div className={cn(`grid ${columns} ${gap}`, className)} {...props}>
			{children}
		</div>
	);
};

export default Grid;

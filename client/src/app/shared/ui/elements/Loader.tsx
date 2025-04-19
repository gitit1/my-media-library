'use client';

import { cn } from '@utils';
import { HTMLAttributes } from 'react';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}

export default function Loader({
	size = 'md',
	className = '',
	...props
}: LoaderProps) {
	const sizeClasses = {
		sm: 'h-4 w-4 border-2',
		md: 'h-6 w-6 border-2',
		// tailwind sets lg spinner larger for visual balance
		// adjust thickness here if needed
		lg: 'h-10 w-10 border-4',
	};

	return (
		<div
			className={cn(
				'animate-spin rounded-full border-t-transparent border-solid',
				sizeClasses[size],
				'dark:border-gray-300 border-gray-700',
				className
			)}
			role="status"
			{...props}
		/>
	);
}

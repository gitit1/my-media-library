'use client';

import React from 'react';
import { cn } from '@utils';

interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
	children: React.ReactNode;
	className?: string;
}

export default function Table({ children, className, ...props }: TableProps) {
	return (
		<div className="overflow-x-auto w-full">
			<table
				className={cn(
					'w-full table-auto border-collapse text-sm',
					className
				)}
				{...props}
			>
				{children}
			</table>
		</div>
	);
}

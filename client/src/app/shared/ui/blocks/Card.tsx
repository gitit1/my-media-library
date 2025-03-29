'use client';

import { ReactNode } from 'react';
import { useTheme } from '@theme';
import { CardsView, Theme } from '@types';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	title?: string;
	image?: string;
	onClick?: () => void;
	clickable?: boolean;
	className?: string;
	variant?: CardsView;
}

const Card = ({
	children,
	title,
	image,
	onClick,
	clickable = false,
	className,
	variant = CardsView.Grid,
}: CardProps) => {
	const { theme } = useTheme();

	return (
		<div
			onClick={onClick}
			className={`
        ${theme === Theme.Light ? 'bg-surface-light' : 'bg-surface-dark'}
        rounded-lg shadow-md overflow-hidden
        transition-all duration-200
        ${clickable ? 'cursor-pointer hover:scale-105' : ''}
        ${className}
      `}
		>
			{image && variant === CardsView.Grid && (
				<img
					src={image}
					alt={title || 'Card Image'}
					className="w-full h-40 object-cover"
				/>
			)}
			<div
				className={`p-4 ${
					variant === CardsView.List ? 'flex items-center gap-4' : ''
				}`}
			>
				{variant === CardsView.List && image && (
					<img
						src={image}
						alt={title || 'Card Image'}
						className="w-24 h-32 object-cover rounded"
					/>
				)}

				<div className="flex-1">
					{title && (
						<div className="text-[18px] font-medium leading-none mb-2">
							{title}
						</div>
					)}
					<div>{children}</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

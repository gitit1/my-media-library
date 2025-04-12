'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useTheme } from '@theme';
import { BtnSize, BtnType, BtnVariant, Theme } from '@types';

interface ButtonProps {
	children?: React.ReactNode;
	onClick?: () => void;
	style?: any;
	className?: string;
	type?: BtnType;
	icon?: 'close' | React.ReactNode;
	href?: string;
	variant?: BtnVariant;
	size?: BtnSize;
	disabled?: boolean;
}

const Button = ({
	children,
	onClick,
	className,
	type = BtnType.Button,
	icon,
	href,
	style,
	variant = BtnVariant.Default,
	size,
	disabled = false,
}: ButtonProps) => {
	const { theme } = useTheme();

	const renderIcon = () => {
		if (icon === 'close') return <X />;
		if (icon) return icon;
		return null;
	};

	const baseStyle =
		'inline-flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors duration-200';

	const variantStyle =
		variant === BtnVariant.Outline
			? 'bg-transparent border border-custom dark:border-custom-dark text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
			: theme === Theme.Dark
			? 'bg-gray-700 text-white border border-custom-dark hover:bg-gray-600'
			: 'bg-gray-200 text-gray-900 border border-custom hover:bg-gray-300';

	const sizeStyles = {
		sm: 'text-sm px-3 py-1',
		md: 'text-base px-4 py-2',
		lg: 'text-lg px-5 py-3',
	};

	const appliedSize = sizeStyles[size || BtnSize.Medium];

	const buttonClasses = `${baseStyle} ${appliedSize} ${variantStyle} ${className}`;

	const buttonContent = (
		<>
			{renderIcon()}
			{children}
		</>
	);

	// Force `inline-block` to ensure border rendering
	if (href) {
		return (
			<Link href={href} className={`inline-block ${buttonClasses}`}>
				{buttonContent}
			</Link>
		);
	} else {
		return (
			<button
				type={type}
				onClick={onClick}
				className={`inline-block ${buttonClasses}`}
				style={style}
				disabled={disabled}
			>
				{buttonContent}
			</button>
		);
	}
};

export default Button;

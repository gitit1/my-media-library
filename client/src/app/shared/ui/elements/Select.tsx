'use client';

import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@utils';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Trigger
		ref={ref}
		className={cn(
			'inline-flex items-center justify-between rounded border px-3 py-1.5 text-sm shadow-sm focus:outline-none',
			className
		)}
		{...props}
	>
		{children}
		<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
	</SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const SelectContent = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Portal>
		<SelectPrimitive.Content
			ref={ref}
			className={cn(
				'z-50 min-w-[180px] overflow-hidden rounded border bg-white shadow-md',
				className
			)}
			{...props}
		>
			<SelectPrimitive.Viewport className="p-1">
				{children}
			</SelectPrimitive.Viewport>
		</SelectPrimitive.Content>
	</SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

export const SelectItem = React.forwardRef<
	React.ElementRef<typeof SelectPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
	<SelectPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm text-gray-800 hover:bg-gray-100',
			className
		)}
		{...props}
	>
		<span className="flex-grow">{children}</span>
		<SelectPrimitive.ItemIndicator className="absolute right-2">
			<Check className="h-4 w-4" />
		</SelectPrimitive.ItemIndicator>
	</SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

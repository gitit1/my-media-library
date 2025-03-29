'use client';

import * as Tabs from '@radix-ui/react-tabs';

export const TabsRoot = Tabs.Root;
export const TabsList = ({ children }: { children: React.ReactNode }) => (
	<Tabs.List className="flex gap-2 rounded-md bg-gray-100 p-1 dark:bg-gray-800">
		{children}
	</Tabs.List>
);

export const TabsTrigger = ({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) => (
	<Tabs.Trigger
		value={value}
		className="px-4 py-2 rounded text-sm font-medium bg-transparent text-gray-600 data-[state=active]:bg-white data-[state=active]:text-black"
	>
		{children}
	</Tabs.Trigger>
);

export const TabsContent = ({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) => (
	<Tabs.Content value={value} className="pt-4">
		{children}
	</Tabs.Content>
);

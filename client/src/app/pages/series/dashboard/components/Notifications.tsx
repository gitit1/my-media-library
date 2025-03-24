'use client';

import React from 'react';
import Container from '@/app/shared/ui/Container';
import Typography from '@/app/shared/ui/Typography';
import Flex from '@/app/shared/ui/Flex';
import { NotificationData } from '@/types/notification';

const notifications: NotificationData[] = [
	{
		id: 'n1',
		type: 'missing-episode',
		message: 'Episode 3 is missing for "My Awesome Series"',
	},
	{
		id: 'n2',
		type: 'new-sub',
		message: 'A new subtitle is available for "Dark Matter" Episode 5',
	},
	{
		id: 'n3',
		type: 'error-path',
		message: 'Path X: drive not found',
	},
	// Add more as needed to test
];

export const columnsConfig = [
	{
		title: 'Episodes',
		types: ['missing-episode', 'new-episode'],
		bgColor: 'bg-blue-50',
		emptyMessage: 'No episode notifications.',
	},
	{
		title: 'Subtitles',
		types: ['missing-sub', 'new-sub'],
		bgColor: 'bg-green-50',
		emptyMessage: 'No subtitle notifications.',
	},
	{
		title: 'Other',
		types: ['error-path', 'info'],
		bgColor: 'bg-red-50',
		emptyMessage: 'No other notifications.',
	},
];

export default function Notifications() {
	// Check if everything is empty
	const noNotifications = !notifications.length;

	return (
		<Container className="mt-2 p-4 shadow bg-white">
			{noNotifications ? (
				<Typography>No new notifications.</Typography>
			) : (
				<Flex className="w-full" align="start" justify="start" gap={4}>
					{columnsConfig.map(
						({ title, types, bgColor, emptyMessage }) => {
							// Filter notifications for each column’s types
							const columnNotifications = notifications.filter(
								(n) => types.includes(n.type)
							);

							return (
								<NotificationColumn
									key={title}
									title={title}
									notifications={columnNotifications}
									bgColor={bgColor}
									emptyMessage={emptyMessage}
								/>
							);
						}
					)}
				</Flex>
			)}
		</Container>
	);
}
interface NotificationColumnProps {
	title: string;
	notifications: NotificationData[];
	bgColor?: string; // e.g., "bg-blue-50"
	emptyMessage?: string; // e.g., "No episode notifications."
}

export function NotificationColumn({
	title,
	notifications,
	bgColor = 'bg-white',
	emptyMessage = 'No notifications.',
}: NotificationColumnProps) {
	return (
		<Container className={`flex-1 p-4 rounded shadow ${bgColor}`}>
			<Typography type="h2" className="font-semibold mb-2">
				{title}
			</Typography>
			{notifications.length === 0 ? (
				<Typography>{emptyMessage}</Typography>
			) : (
				notifications.map((notif) => (
					<Container
						key={notif.id}
						className="mb-2 p-2 rounded bg-white"
					>
						<Typography>{notif.message}</Typography>
						{notif.action && (
							<button
								className="text-sm underline mt-1"
								onClick={notif.action.onClick}
							>
								{notif.action.label}
							</button>
						)}
					</Container>
				))
			)}
		</Container>
	);
}

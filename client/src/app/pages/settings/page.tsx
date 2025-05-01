'use client';

import { Container, Typography } from '@ui';
import { TypographyType } from '@types';
import PathsTable from './paths/components/PathsTable';
import AddPathModal from './paths/components/AddPathModal';

export default function SettingsPage() {
	return (
		<Container className="p-6 space-y-6">
			<Typography type={TypographyType.H1}>Settings</Typography>

			<section>
				<Typography type={TypographyType.H2} className="mb-2">
					Manage File Paths
				</Typography>

				<AddPathModal />
				<PathsTable />
			</section>

			{/* Future settings sections go here */}
		</Container>
	);
}

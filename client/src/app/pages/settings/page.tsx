'use client';

import { Button, Container, Typography } from '@ui';
import { TypographyType } from '@types';
import PathsTable from './paths/components/PathsTable';
import PathModal from './paths/components/PathModal';
import { useState } from 'react';

export default function SettingsPage() {
	const [openPathModal, setOpenPathModal] = useState<boolean>(false);
	return (
		<Container className="p-6 space-y-6">
			<Typography type={TypographyType.H1}>Settings</Typography>

			<section>
				<Typography type={TypographyType.H2} className="mb-2">
					Manage File Paths
				</Typography>
				<Button onClick={() => setOpenPathModal(true)} className="mb-4">
					Add New Path
				</Button>

				{openPathModal && (
					<PathModal
						mode="add"
						onClose={() => setOpenPathModal(false)}
					/>
				)}
				<PathsTable />
			</section>

			{/* Future settings sections go here */}
		</Container>
	);
}

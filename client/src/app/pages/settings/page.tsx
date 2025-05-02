'use client';

import { useState } from 'react';
import { usePaths } from '@hooks';
import { Button, Container, Loader, Typography } from '@ui';
import { Path, TypographyType } from '@types';
import PathsTable from './paths/components/PathsTable';
import PathModal from './paths/components/PathModal';

export default function SettingsPage() {
	const { paths, loading, addPath, updatePath, deletePath } = usePaths();

	const [editingPath, setEditingPath] = useState<Path | null>(null);
	const [addingPath, setAddingPath] = useState(false);

	return (
		<Container className="p-6 space-y-6">
			<Typography type={TypographyType.H1}>Settings</Typography>

			<section>
				<Typography type={TypographyType.H2} className="mb-2">
					Manage File Paths
				</Typography>
				<Button onClick={() => setAddingPath(true)} className="mb-4">
					Add New Path
				</Button>

				{loading ? (
					<Loader />
				) : (
					<PathsTable
						paths={paths}
						onEdit={setEditingPath}
						onDelete={deletePath}
					/>
				)}
				{addingPath && (
					<PathModal
						mode="add"
						onClose={() => setAddingPath(false)}
						addPath={addPath}
					/>
				)}

				{editingPath && (
					<PathModal
						mode="edit"
						initialData={editingPath}
						onClose={() => setEditingPath(null)}
						updatePath={updatePath}
					/>
				)}
			</section>

			{/* Future settings sections go here */}
		</Container>
	);
}

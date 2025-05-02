'use client';

import { useState } from 'react';
import { usePaths } from '@hooks';
import { BtnSize, BtnVariant, Path } from '@types';
import { Button, Loader } from '@ui';
import PathModal from '@/app/pages/settings/paths/components/PathModal';

export default function PathsTable() {
	const { paths, loading } = usePaths();

	const [editingPath, setEditingPath] = useState<Path | null>(null);

	if (loading) return <Loader />;

	return (
		<table className="w-full mt-6 border border-gray-200 rounded">
			<thead>
				<tr className="bg-gray-100 text-left text-sm">
					<th className="p-2">Name</th>
					<th className="p-2">Path</th>
					<th className="p-2">Drive</th>
					<th className="p-2">Enabled</th>
					<th className="p-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{paths.map((path: Path) => (
					<tr
						key={path.id}
						className="border-t border-gray-200 text-sm"
					>
						<td className="p-2">{path.name}</td>
						<td className="p-2">{path.path}</td>
						<td className="p-2">{path.driveLetter}</td>
						<td className="p-2">{path.enabled ? '✅' : '❌'}</td>
						<td className="p-2">
							<Button
								size={BtnSize.Small}
								variant={BtnVariant.Secondary}
								onClick={() => setEditingPath(path)}
							>
								✏️ Edit
							</Button>
							{editingPath && (
								<PathModal
									mode="edit"
									initialData={editingPath}
									onClose={() => setEditingPath(null)}
								/>
							)}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

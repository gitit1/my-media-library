'use client';

import { BtnSize, BtnVariant, Path } from '@types';
import { Button } from '@ui';

interface PathsTableProps {
	paths: Path[];
	onEdit: (path: Path) => void;
	onDelete: (id: number) => void;
	onToggle: (id: number, enabled: boolean) => void;
}

export default function PathsTable({
	paths,
	onEdit,
	onDelete,
	onToggle,
}: PathsTableProps) {
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
						<td className="p-2">
							<Button
								size={BtnSize.Small}
								variant={
									path.enabled
										? BtnVariant.Secondary
										: BtnVariant.Outline
								}
								onClick={() => onToggle(path.id, !path.enabled)}
							>
								{path.enabled ? '✅ Enabled' : '❌ Disabled'}
							</Button>
						</td>
						<td className="p-2">
							<Button
								size={BtnSize.Small}
								variant={BtnVariant.Secondary}
								onClick={() => onEdit(path)}
							>
								✏️ Edit
							</Button>
							<Button
								size={BtnSize.Small}
								variant={BtnVariant.Destructive}
								onClick={() => {
									if (
										confirm(
											'Are you sure you want to delete this path?'
										)
									) {
										onDelete(path.id);
									}
								}}
							>
								🗑️
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

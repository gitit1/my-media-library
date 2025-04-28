'use client';

import React from 'react';
import { Path, TypographyType } from '@types';
import { Container, Typography } from '@ui';
import { usePaths } from '@hooks';

export default function ManagePathsPage() {
	const { paths, loading } = usePaths();

	if (loading)
		return <Typography type={TypographyType.P}>Loading...</Typography>;

	return (
		<Container>
			<Typography type={TypographyType.H1}>Manage File Paths</Typography>

			<table className="w-full mt-6 border border-gray-200 rounded">
				<thead>
					<tr className="bg-gray-100 text-left text-sm">
						<th className="p-2">Name</th>
						<th className="p-2">Path</th>
						<th className="p-2">Drive</th>
						<th className="p-2">Enabled</th>
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
								{path.enabled ? '✅' : '❌'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Container>
	);
}

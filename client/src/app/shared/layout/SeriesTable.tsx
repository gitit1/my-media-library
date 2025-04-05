'use client';

import { useRouter } from 'next/navigation';
import { SeriesDetails } from '@types';
import { Table, Typography } from '@ui';
import { hasMissingEpisodes, hasMissingSubtitles } from '@utils';

interface SeriesTableProps {
	data: SeriesDetails[];
}

export default function SeriesTable({ data }: SeriesTableProps) {
	const router = useRouter();

	return (
		<Table>
			<thead>
				<tr>
					<th className="border px-4 py-2">Poster</th>
					<th className="border px-4 py-2">Series Name</th>
					<th className="border px-4 py-2">Path</th>
					<th className="border px-4 py-2">Series Status</th>
					<th className="border px-4 py-2">Watching Status</th>
					<th className="border px-4 py-2">Current Episode</th>
					<th className="border px-4 py-2">Series Type</th>
					<th className="border px-4 py-2">Flags</th>
					<th className="border px-4 py-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				{data.length === 0 ? (
					<tr>
						<td
							colSpan={9}
							className="border px-4 py-2 text-center"
						>
							No series tracked yet.
						</td>
					</tr>
				) : (
					data.map((series) => {
						const missingEps = hasMissingEpisodes(series);
						const missingSubs = hasMissingSubtitles(series);

						return (
							<tr key={series.id}>
								<td className="border px-4 py-2">
									{series.poster ? (
										<img
											src={series.poster}
											alt="Poster"
											className="w-12 h-auto"
										/>
									) : (
										<Typography>No Poster</Typography>
									)}
								</td>
								<td
									className="border px-4 py-2 underline text-blue-600 cursor-pointer"
									onClick={() =>
										router.push(`/series/${series.id}`)
									}
								>
									{series.seriesName}
								</td>
								<td className="border px-4 py-2 text-sm underline">
									{series.folder_name}
								</td>
								<td className="border px-4 py-2">
									{series.seriesStatus}
								</td>
								<td className="border px-4 py-2">
									{series.watchingStatus}
								</td>
								<td className="border px-4 py-2">
									{series.currentEpisode ?? 'N/A'}
								</td>
								<td className="border px-4 py-2">
									{series.seriesType || 'N/A'}
								</td>
								<td className="border px-4 py-2">
									{missingEps && (
										<span className="text-orange-600 mr-2">
											●
										</span>
									)}
									{missingSubs && (
										<span className="text-purple-600">
											●
										</span>
									)}
								</td>
								<td className="border px-4 py-2 underline text-sm cursor-pointer">
									Details
								</td>
							</tr>
						);
					})
				)}
			</tbody>
		</Table>
	);
}

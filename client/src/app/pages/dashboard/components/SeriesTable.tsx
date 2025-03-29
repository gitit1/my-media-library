'use client';

import React from 'react';
import { mockSeriesData } from '@/mocks';
import { Container, Typography } from '@ui';
import { SeriesDetails } from '@types';
import { hasMissingEpisodes, hasMissingSubtitles } from '@utils';

export default function SeriesTable() {
	const seriesData = mockSeriesData;

	return (
		<Container className="overflow-x-auto mt-3">
			<table className="w-full table-auto border-collapse">
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
					{seriesData.length === 0 ? (
						<tr>
							<td
								colSpan={9}
								className="border px-4 py-2 text-center"
							>
								No series tracked yet.
							</td>
						</tr>
					) : (
						seriesData.map((series: SeriesDetails) => {
							const missingEps = hasMissingEpisodes(series);
							const missingSubs = hasMissingSubtitles(series);

							return (
								<tr key={series.id}>
									{/* Poster */}
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

									{/* Series Name */}
									<td className="border px-4 py-2">
										<button
											className="underline text-blue-600"
											onClick={() =>
												console.log('series clicked')
											}
										>
											{series.seriesName}
										</button>
									</td>

									{/* Path (folder_name) */}
									<td className="border px-4 py-2">
										<button
											className="underline text-sm"
											onClick={() =>
												console.log(
													`Open folder: ${series.folder_name}`
												)
											}
										>
											{series.folder_name}
										</button>
									</td>

									{/* Series Status */}
									<td className="border px-4 py-2">
										{series.seriesStatus}
									</td>

									{/* Watching Status */}
									<td className="border px-4 py-2">
										{series.watchingStatus}
									</td>

									{/* Current Episode */}
									<td className="border px-4 py-2">
										{series.currentEpisode ?? 'N/A'}
									</td>

									{/* Series Type */}
									<td className="border px-4 py-2">
										{series.seriesType || 'N/A'}
									</td>

									{/* Flags */}
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

									{/* Actions */}
									<td className="border px-4 py-2">
										<button
											className="underline text-sm"
											onClick={() =>
												console.log('series clicked')
											}
										>
											Details
										</button>
									</td>
								</tr>
							);
						})
					)}
				</tbody>
			</table>
		</Container>
	);
}

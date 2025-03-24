'use client';

import React from 'react';
import Container from '@/app/shared/ui/Container';
import Typography from '@/app/shared/ui/Typography';

export type SeriesDetails = {
	id: number;
	thetvdb_id: number;
	seriesName: string;
	folder_name: string;
	seriesStatus: string;
	watchingStatus: string;
	subtitleStatus: string;
	seriesType: string; // <-- new field for Telenovela, Anime, etc.
	summary?: string;
	posterPath?: string;
	currentEpisode?: number;
	plex_id?: string;
	tags?: string[];
	genre?: string[];
	seasons?: {
		id: number;
		number: number;
		episodes: {
			id: number;
			number: number;
			filePath: string;
			hasBuiltSubs: boolean;
			hasExternalSubs: boolean;
			watched: boolean;
		}[];
	}[];
};

// Example logic to detect missing episodes
function hasMissingEpisodes(series: SeriesDetails): boolean {
	if (!series.seasons) return false;
	let total = 0;
	let found = 0;
	series.seasons.forEach((season) => {
		season.episodes.forEach((ep) => {
			total++;
			if (ep.filePath) {
				found++;
			}
		});
	});
	return found < total; // If at least one missing => true
}

// Example logic for missing subtitles
function hasMissingSubtitles(series: SeriesDetails): boolean {
	return series.subtitleStatus !== 'with';
}

const seriesData: SeriesDetails[] = [
	{
		id: 1,
		thetvdb_id: 123,
		seriesName: 'My Awesome Series',
		folder_name: 'D:/Media/Series/MyAwesomeSeries',
		seriesStatus: 'running',
		watchingStatus: 'Watching',
		subtitleStatus: 'with',
		seriesType: 'Anime',
		posterPath: '/path/to/poster1.jpg',
		currentEpisode: 5,
		seasons: [
			{
				id: 101,
				number: 1,
				episodes: [
					{
						id: 10101,
						number: 1,
						filePath: 'D:/Media/Series/MyAwesomeSeries/S01E01.mkv',
						hasBuiltSubs: true,
						hasExternalSubs: false,
						watched: true,
					},
					// ...
				],
			},
		],
	},
	{
		id: 2,
		thetvdb_id: 456,
		seriesName: 'Dark Matter',
		folder_name: 'D:/Media/Series/DarkMatter',
		seriesStatus: 'ended',
		watchingStatus: 'On Hold',
		subtitleStatus: 'partial',
		seriesType: 'Telenovela',
		posterPath: '/path/to/poster2.jpg',
		currentEpisode: 10,
		seasons: [
			{
				id: 102,
				number: 1,
				episodes: [
					{
						id: 10201,
						number: 1,
						filePath: 'D:/Media/Series/DarkMatter/S01E01.mkv',
						hasBuiltSubs: false,
						hasExternalSubs: true,
						watched: false,
					},
					// Possibly missing episodes => triggers orange flag
				],
			},
		],
	},
];

export default function SeriesTable() {
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
						seriesData.map((series) => {
							const missingEps = hasMissingEpisodes(series);
							const missingSubs = hasMissingSubtitles(series);

							return (
								<tr key={series.id}>
									{/* Poster */}
									<td className="border px-4 py-2">
										{series.posterPath ? (
											<img
												src={series.posterPath}
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

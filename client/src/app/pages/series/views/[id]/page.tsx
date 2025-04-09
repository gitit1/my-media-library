'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { mockSeriesData } from '@mocks';
import { SeriesDetails } from '@types';

interface Episode {
	episodeId: number;
	episodeNumber: number;
	episodeTitle: string;
	description: string;
	filePath: string;
	hasBuiltSubs: boolean;
	hasExternalSubs: boolean;
	watched: boolean;
	airDate?: string;
	runtime?: number;
	poster?: string;
	plex_id?: string;
}

export default function SingleSeriesPage({
	params,
}: {
	params: { id: string };
}) {
	const [seriesData, setSeriesData] = useState<SeriesDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const seriesId = params.id; // dynamic [id] from the URL

	useEffect(() => {
		// No real fetch; just find in mock array
		const seriesId = parseInt(params.id, 10);
		const foundSeries =
			mockSeriesData.find((s) => s.id === seriesId) || null;
		setSeriesData(foundSeries);
		setLoading(false);
	}, [params.id]);

	if (loading) {
		return <div className="p-4 text-center">Loading...</div>;
	}

	if (!seriesData) {
		return (
			<div className="p-4 text-center text-red-500">
				Series not found or failed to load.
			</div>
		);
	}

	// Action handlers (placeholders)
	const handleMarkAllWatched = () => {
		alert('TODO: Mark all episodes watched');
	};

	const handleRescan = () => {
		alert('TODO: Re-scan this series');
	};

	return (
		<div className="p-4 max-w-screen-lg mx-auto">
			{/* Hero / Overview Section */}
			<div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-8">
				{/* Poster */}
				<img
					src={seriesData.poster}
					alt={`${seriesData.seriesName} Poster`}
					className="w-48 h-auto object-cover rounded shadow"
				/>
				{/* Overview Text */}
				<div className="flex flex-col justify-between">
					<div>
						<h1 className="text-2xl font-bold mb-2">
							{seriesData.seriesName}
						</h1>
						<p className="text-gray-700">{seriesData.summary}</p>
					</div>

					{/* Quick Actions */}
					<div className="mt-4">
						<button
							onClick={handleMarkAllWatched}
							className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
						>
							Mark All Watched
						</button>
						<button
							onClick={handleRescan}
							className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
						>
							Re-scan
						</button>
					</div>
				</div>
			</div>

			{/* Seasons & Episodes */}
			<div>
				<h2 className="text-xl font-semibold mb-4">Seasons</h2>
				{seriesData.seasons?.map((season) => (
					<div key={season.seasonNumber} className="mb-6">
						<h3 className="text-lg font-medium mb-2">
							Season {season.seasonNumber}
						</h3>
						<div className="ml-4 border-l border-gray-300 pl-4">
							{season.episodes.map((ep) => (
								<EpisodeRow
									key={ep.episodeId}
									seasonNumber={season.seasonNumber}
									seriesId={seriesId}
									episode={ep}
								/>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

function EpisodeRow({
	seasonNumber,
	seriesId,
	episode,
}: {
	seasonNumber: number;
	seriesId: string;
	episode: Episode;
}) {
	const handleToggleWatch = () => {
		alert(`Toggle watch for S${seasonNumber}E${episode.episodeNumber}`);
	};

	const handleSubtitles = () => {
		alert(`Manage subtitles for S${seasonNumber}E${episode.episodeNumber}`);
	};

	return (
		<div className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded p-2 mb-2">
			<div className="mb-1 sm:mb-0">
				{/* 
          Link to Episode Page 
          e.g. /series/123/episode/456 
        */}
				<Link
					href={`/series/${seriesId}/episode/${episode.episodeId}`}
					className="font-semibold hover:underline"
				>
					E{episode.episodeNumber}: {episode.episodeTitle}
				</Link>
				<div className="text-sm text-gray-600">
					Watched: {episode.watched ? 'Yes' : 'No'} | Subs:{' '}
					{episode.hasBuiltSubs
						? 'Built In Subs'
						: episode.hasExternalSubs
						? 'External Subs'
						: 'No Subs'}
				</div>
			</div>
			<div>
				<button
					className="mr-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
					onClick={handleToggleWatch}
				>
					Watch Toggle
				</button>
				<button
					className="px-3 py-1 bg-teal-500 text-white rounded text-sm hover:bg-teal-600 transition"
					onClick={handleSubtitles}
				>
					Subs
				</button>
			</div>
		</div>
	);
}

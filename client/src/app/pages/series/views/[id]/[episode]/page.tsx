'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockSeriesData } from '@mocks';
import { SeriesDetails } from '@types';

export default function EpisodePage({
	params,
}: {
	params: { id: string; episode: string };
}) {
	const [episodeData, setEpisodeData] = useState<{
		episode: SeriesDetails['seasons'][number]['episodes'][number];
		series: SeriesDetails;
	} | null>(null);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// const seriesId = parseInt(params.id, 10);
		const seriesId = 1;
		// const episodeId = parseInt(params.episode, 10);
		const episodeId = 1001;

		const foundSeries = mockSeriesData.find((s) => s.id === seriesId);

		// If series or seasons don't exist, bail out
		if (!foundSeries || !foundSeries.seasons) {
			setEpisodeData(null);
			setLoading(false);
			return;
		}
		console.log('foundSeries', foundSeries);
		// We'll store the discovered episode here
		let foundEpisode:
			| SeriesDetails['seasons'][number]['episodes'][number]
			| undefined;

		// Loop over each season to find the episode
		for (const season of foundSeries.seasons) {
			const maybeEpisode = season.episodes.find(
				(ep) => ep.episodeId === episodeId
			);
			if (maybeEpisode) {
				foundEpisode = maybeEpisode;
				break;
			}
		}

		// If we found the episode, store it in state, else store null
		if (foundEpisode) {
			setEpisodeData({ episode: foundEpisode, series: foundSeries });
		} else {
			setEpisodeData(null);
		}

		setLoading(false);
	}, [params.id, params.episode]);

	if (loading) {
		return <div className="p-4 text-center">Loading (mock)...</div>;
	}

	if (!episodeData) {
		return (
			<div className="p-4 text-center text-red-500">
				Episode not found (mock).
			</div>
		);
	}

	const { series, episode } = episodeData;

	const handleToggleWatch = () => {
		alert(
			`Toggle watch for E${episode.episodeNumber} in ${series.seriesName}`
		);
	};

	const handleSubtitles = () => {
		alert(`Manage subtitles for E${episode.episodeNumber}`);
	};

	return (
		<div className="p-4 max-w-screen-md mx-auto">
			<h1 className="text-2xl font-bold mb-2">
				{series.seriesName} — S??E{episode.episodeNumber}
			</h1>

			{/* Optional: Air date, runtime, or other fields */}
			{episode.airDate && (
				<div className="text-gray-600 mb-1">
					Air Date: {episode.airDate}
				</div>
			)}
			{typeof episode.runtime === 'number' && (
				<div className="text-gray-600 mb-2">
					Runtime: {episode.runtime} minutes
				</div>
			)}

			<p className="mb-4">{episode.description}</p>

			{/* Watch/Sub Status */}
			<div className="mb-4 text-gray-700">
				<div>Watched: {episode.watched ? 'Yes' : 'No'}</div>
				<div>Built-in Subs: {episode.hasBuiltSubs ? 'Yes' : 'No'}</div>
				<div>
					External Subs: {episode.hasExternalSubs ? 'Yes' : 'No'}
				</div>
			</div>

			{/* Actions */}
			<div>
				<button
					className="mr-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					onClick={handleToggleWatch}
				>
					Watch Toggle
				</button>
				<button
					className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
					onClick={handleSubtitles}
				>
					Subs
				</button>
			</div>

			{/* Link back to Single-Series Page */}
			<div className="mt-6">
				<Link
					href={`/series/${series.id}`}
					className="text-blue-600 hover:underline"
				>
					← Back to Series
				</Link>
			</div>
		</div>
	);
}

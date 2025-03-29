import { SeriesDetails } from '@types';

export function hasMissingEpisodes(series: SeriesDetails): boolean {
	if (!series.seasons) return false;

	let total = 0;
	let found = 0;

	series.seasons.forEach((season) => {
		season.episodes.forEach((ep) => {
			total++;
			if (ep.filePath) found++;
		});
	});

	return found < total; // true if any episode is missing
}

export function hasMissingSubtitles(series: SeriesDetails): boolean {
	return series.subtitleStatus !== 'with';
}

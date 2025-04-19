export type SeriesDetails = {
	id: number;
	thetvdb_id: number;
	seriesName: string; // Renamed from "name"
	folder_name: string;
	status: string; // e.g. "running", "ended"
	watchingStatus: string; // e.g. "Watching", "Completed", "On Hold"
	subtitleStatus: string; // e.g. "with", "without", "partial"
	seriesType: string; // e.g. "Telenovela", "Anime", "Cartoon"
	summary?: string;
	poster?: string;
	posters?: string[];
	banners?: string[];
	icons?: string[];
	icon?: string;
	banner?: string;
	currentSeason?: number;
	currentEpisode?: number;
	year: number;
	plex_id?: string;
	tags?: string[];
	genre?: string[];
	seasons?: {
		seasonId: number;
		seasonNumber: number;
		watchedAll: boolean;
		poster?: string;
		description: string;
		year: number;
		plex_id?: string;
		episodes: {
			episodeId: number;
			episodeNumber: number;
			episodeTitle: string;
			description: string;
			filePath: string;
			hasBuiltSubs: boolean;
			hasExternalSubs: boolean;
			watched: boolean;
			airDate?: string; // optional
			runtime?: number; // optional
			poster?: string;
			plex_id?: string;
		}[];
	}[];
};

export type ShortenedSeriesDetails = {
	thetvdb_id: number;
	seriesName: {
		en: string;
		he: string;
	};
	summary: {
		en: string;
		he: string;
	};
	year: number | null;
	poster: string;
	status: string;
	alreadyExists: boolean;
};

export type ExtendedSeriesDetails = {
	thetvdb_id: number;
	seriesName: {
		en: string;
		he: string;
	};
	summary: {
		en: string;
		he: string;
	};
	year: number | null;
	status: string;
	seasons: number;
	genres: string[];
	posters: { url: string }[];
	banners: { url: string }[];
	icons: { url: string }[];
};

export interface EpisodeDetails {
	episodeId: number;
	seriesId: number;
	title: string;
	episodeNumber: number;
	seasonNumber: number;
	description: string;
	watched: boolean;
	subsAvailable: boolean;
	airDate?: string; // optional
	runtime?: number; // optional
	// any other fields you want
}

export const viewingStates = [
	{ value: '001', label: 'Ended - Watched' },
	{ value: '002', label: 'Ended - Need to Continue' },
	{ value: '003', label: 'Ended - Want to Watch' },
	{ value: '004', label: 'Ended - Stop Following' },
	{ value: '006', label: 'Running - Watching' },
	{ value: '007', label: 'Running - Need to Continue' },
	{ value: '008', label: 'Running - Want to Watch' },
	{ value: '009', label: 'Running - Stop Following' },
];

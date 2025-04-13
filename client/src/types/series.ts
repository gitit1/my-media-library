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
	name: {
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

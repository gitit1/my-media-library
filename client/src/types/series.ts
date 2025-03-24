export type SeriesDetails = {
	id: number;
	thetvdb_id: number;
	seriesName: string; // Renamed from "name"
	folder_name: string;
	seriesStatus: string; // e.g. "running", "ended"
	watchingStatus: string; // e.g. "Watching", "Completed", "On Hold"
	subtitleStatus: string; // e.g. "with", "without", "partial"
	seriesType: string; // e.g. "Telenovela", "Anime", "Cartoon"
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

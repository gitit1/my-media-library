import { SeriesDetails } from '@types';

export const mockSeriesData: SeriesDetails[] = [
	{
		id: 1,
		thetvdb_id: 111,
		seriesName: 'My Cool Show',
		folder_name: 'my-cool-show',
		seriesStatus: 'running',
		watchingStatus: 'Watching',
		subtitleStatus: 'with',
		seriesType: 'Cartoon',
		summary: 'An exciting cartoon series about cool adventures.',
		poster: '/images/posters/my-cool-show.jpg',
		currentEpisode: 1,
		year: 2023,
		tags: ['fun', 'cartoon'],
		genre: ['Adventure', 'Comedy'],
		seasons: [
			{
				seasonId: 101,
				seasonNumber: 1,
				watchedAll: false,
				description: 'Season 1 description',
				year: 2023,
				episodes: [
					{
						episodeId: 1001,
						episodeNumber: 1,
						episodeTitle: 'Pilot episode',
						description: 'Pilot episode description',
						filePath: '/my-cool-show/s01e01.mp4',
						hasBuiltSubs: true,
						hasExternalSubs: false,
						watched: false,
					},
					{
						episodeId: 1002,
						episodeNumber: 2,
						episodeTitle: 'Second episode',
						description: 'Second episode description',
						filePath: '/my-cool-show/s01e02.mp4',
						hasBuiltSubs: false,
						hasExternalSubs: true,
						watched: true,
					},
				],
			},
		],
	},
	{
		id: 2,
		thetvdb_id: 222,
		seriesName: 'Another Show',
		folder_name: 'another-show',
		seriesStatus: 'ended',
		watchingStatus: 'Completed',
		subtitleStatus: 'partial',
		seriesType: 'Anime',
		summary: 'A thrilling anime series with deep storylines.',
		poster: '/images/posters/another-show.jpg',
		currentEpisode: 12,
		year: 2021,
		tags: ['anime'],
		genre: ['Action', 'Drama'],
		seasons: [
			{
				seasonId: 201,
				seasonNumber: 1,
				watchedAll: true,
				description: 'Season 1 of Another Show',
				year: 2020,
				episodes: [
					{
						episodeId: 2001,
						episodeNumber: 1,
						episodeTitle: 'A new beginning title',
						description: 'A new beginning',
						filePath: '/another-show/s01e01.mp4',
						hasBuiltSubs: true,
						hasExternalSubs: true,
						watched: true,
						airDate: '2020-10-10',
						runtime: 44,
					},
					// ... more episodes
				],
			},
			// ... more seasons if desired
		],
	},
];

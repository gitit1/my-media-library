import { NotificationData } from '@types';
import { SeriesDetails } from './types/series';

export const mockSeriesData: SeriesDetails[] = [
	{
		id: 1,
		thetvdb_id: 123,
		seriesName: 'Legends of Tomorrow',
		folder_name: 'D:/Media/Series/MyAwesomeSeries',
		seriesStatus: 'running',
		watchingStatus: 'Watching',
		subtitleStatus: 'with',
		seriesType: 'Series',
		poster: 'https://static.tvtropes.org/pmwiki/pub/images/lots2s.png',
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
		seriesName: 'High Potential',
		folder_name: 'D:/Media/Series/DarkMatter',
		seriesStatus: 'ended',
		watchingStatus: 'On Hold',
		subtitleStatus: 'partial',
		seriesType: 'Series',
		poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAcq3btSWTWKEkQfSQCQB-eFygMijdp98yccpNyB8FiRY-3CxJ',
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
	{
		id: 3,
		thetvdb_id: 123,
		seriesName: 'The Rookie',
		folder_name: 'D:/Media/Series/MyAwesomeSeries',
		seriesStatus: 'running',
		watchingStatus: 'Watching',
		subtitleStatus: 'with',
		seriesType: 'Series',
		poster: 'The Rookie',
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
];

export const mockNotifications: NotificationData[] = [
	{
		id: 'n1',
		type: 'missing-episode',
		message: 'Episode 3 is missing for "My Awesome Series"',
	},
	{
		id: 'n2',
		type: 'new-sub',
		message: 'A new subtitle is available for "Dark Matter" Episode 5',
	},
	{
		id: 'n3',
		type: 'error-path',
		message: 'Path X: drive not found',
	},
	// Add more as needed to test
];

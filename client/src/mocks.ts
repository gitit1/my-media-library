import { NotificationData, SeriesDetails } from '@types';

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

export const mockNotifications: NotificationData[] = [
	{
		id: 'notif-001',
		type: 'missing-episode',
		message: 'Episode 5 of Season 2 is missing for "Stranger Things".',
		additionalData: {
			seriesId: 'st-001',
			seriesName: 'Stranger Things',
			seasonNum: 2,
			episodeNum: 5,
			pathLetter: 'D',
			path: 'D:\\Series\\Stranger Things\\Season 2',
		},
		action: {
			label: 'Rescan Folder',
			onClick: () => {
				console.log('Rescan folder triggered for Stranger Things S2');
			},
		},
	},
	{
		id: 'notif-002',
		type: 'missing-sub',
		message: 'Subtitle is missing for Episode 8 of "Breaking Bad".',
		additionalData: {
			seriesName: 'Breaking Bad',
			seasonNum: 3,
			episodeNum: 8,
		},
		action: {
			label: 'Fetch Subtitles',
			onClick: () => {
				console.log('Fetch subtitle triggered for Breaking Bad S3E8');
			},
		},
	},
	{
		id: 'notif-003',
		type: 'new-episode',
		message: 'New episode available: "The Mandalorian" S3E1.',
		additionalData: {
			seriesName: 'The Mandalorian',
			seasonNum: 3,
			episodeNum: 1,
		},
		action: {
			label: 'Open Series',
			onClick: () => {
				console.log('Navigate to The Mandalorian page');
			},
		},
	},
	{
		id: 'notif-004',
		type: 'new-sub',
		message: 'New Hebrew subtitle found for "Dark" S2E3.',
		additionalData: {
			seriesName: 'Dark',
			seasonNum: 2,
			episodeNum: 3,
		},
		action: {
			label: 'Download Subtitle',
			onClick: () => {
				console.log('Download subtitle for Dark S2E3');
			},
		},
	},
	{
		id: 'notif-005',
		type: 'error-path',
		message: 'Path not found: E:\\Media\\Shows\\UnknownSeries.',
		additionalData: {
			pathLetter: 'E',
			path: 'E:\\Media\\Shows\\UnknownSeries',
		},
		action: {
			label: 'Edit Path',
			onClick: () => {
				console.log('Redirecting to edit path settings');
			},
		},
	},
	{
		id: 'notif-006',
		type: 'info',
		message: 'Your media library is fully synced.',
	},
];

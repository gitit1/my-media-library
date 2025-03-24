export interface NotificationData {
	id: string;
	type:
		| 'missing-episode'
		| 'missing-sub'
		| 'new-episode'
		| 'new-sub'
		| 'error-path'
		| 'info';
	message: string;
	additionalData?: {
		seriesId?: string;
		seriesName?: string;
		episodeId?: string;
		episodeNum?: number;
		seasonNum?: number;
		pathLetter?: string;
		path?: string;
		// ...future fields
	};
	action?: {
		label: string;
		onClick: () => void;
	};
}

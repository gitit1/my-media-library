import { PathsService } from '@services';
import { Path } from '@types';
import { useEffect, useState } from 'react';

export function usePaths() {
	const [paths, setPaths] = useState<Path[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		PathsService.getAll()
			.then(setPaths)
			.catch((err) => console.error('Failed to fetch paths:', err))
			.finally(() => setLoading(false));
	}, []);

	return { paths, loading };
}

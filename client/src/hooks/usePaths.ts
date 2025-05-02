import { PathsService } from '@services';
import { Path } from '@types';
import { useEffect, useState } from 'react';

export function usePaths() {
	const [paths, setPaths] = useState<Path[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchPaths();
	}, []);

	const fetchPaths = () => {
		console.log('fetchPaths');
		setLoading(true);
		PathsService.getAll()
			.then(setPaths)
			.catch((err) => console.error('Failed to fetch paths:', err))
			.finally(() => setLoading(false));
	};

	const deletePath = async (id: number) => {
		try {
			await PathsService.delete(id);
			setPaths((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error('Failed to delete path:', err);
		}
	};

	const addPath = async (data: Path) => {
		console.log('2');
		try {
			const response = await PathsService.add(data); // no timestamps here
			const newPath = response.data;
			setPaths((prev) => [...prev, newPath]);
		} catch (err) {
			console.error('Failed to add path:', err);
			throw err;
		}
	};

	const updatePath = async (id: number, data: Path) => {
		try {
			await PathsService.update(id, data);
			fetchPaths();
		} catch (err) {
			console.error('Failed to update path:', err);
			throw err;
		}
	};

	return {
		paths,
		loading,
		addPath,
		updatePath,
		deletePath,
		refresh: fetchPaths,
	};
}

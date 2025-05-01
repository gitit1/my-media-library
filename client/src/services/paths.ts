import axios from 'axios';
import { Path } from '@types';

const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';

export const PathsService = {
	getAll: async (): Promise<Path[]> => {
		const res = await axios.get(`${API_BASE_URL}/paths`);
		return res.data;
	},

	getDrives(): Promise<string[]> {
		return axios
			.get(`${API_BASE_URL}/filesystem/drives`)
			.then((res) => res.data);
	},

	// Get subfolders inside a given path
	getFolders(base: string): Promise<string[]> {
		return axios
			.get(
				`${API_BASE_URL}/filesystem/folders?base=${encodeURIComponent(
					base
				)}`
			)
			.then((res) => res.data);
	},
	// these will be used in the next steps:
	add: async (data: Omit<Path, 'id' | 'createdAt' | 'updatedAt'>) => {
		return axios.post(`${API_BASE_URL}/paths`, data);
	},

	update: async (id: number, data: Partial<Path>) => {
		return axios.patch(`${API_BASE_URL}/paths/${id}`, data);
	},

	delete: async (id: number) => {
		return axios.delete(`${API_BASE_URL}/paths/${id}`);
	},
};

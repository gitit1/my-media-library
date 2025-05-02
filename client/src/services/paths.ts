import axios from 'axios';
import { Path } from '@types';

const API_BASE_URL =
	`${process.env.NEXT_PUBLIC_API_BASE_URL}` || 'http://localhost:3001/paths';
const pathBase = `${API_BASE_URL}/paths`;
const filesystemBase = `${API_BASE_URL}/filesystem`;

export const PathsService = {
	getAll: async (): Promise<Path[]> => {
		const res = await axios.get(pathBase);
		return res.data;
	},

	async getDrives(): Promise<string[]> {
		const res = await axios.get(`${filesystemBase}/drives`);
		return res.data;
	},

	// Get subfolders inside a given path
	async getFolders(base: string): Promise<string[]> {
		const res = await axios.get(
			`${filesystemBase}/folders?base=${encodeURIComponent(base)}`
		);
		return res.data;
	},

	add: async (data: Omit<Path, 'id' | 'createdAt' | 'updatedAt'>) => {
		return axios.post(pathBase, data);
	},

	update: async (id: number, data: Partial<Path>) => {
		return axios.patch(`${pathBase}/${id}`, data);
	},

	delete: async (id: number) => {
		return axios.delete(`${pathBase}/${id}`);
	},

	toggleEnabled(id: number, enabled: boolean): Promise<void> {
		return axios.patch(`${pathBase}/${id}`, { enabled });
	},
};

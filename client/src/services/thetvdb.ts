import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const searchSeries = async (query: string) => {
	const response = await axios.get(`${API_BASE_URL}/thetvdb/search`, {
		params: { query },
	});

	return response.data;
};

export const getExtendedSeries = async (id: number) => {
	const response = await axios.get(`${API_BASE_URL}/thetvdb/extended/${id}`);

	return response.data;
};

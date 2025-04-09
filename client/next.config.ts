/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	async rewrites() {
		return [
			// Single-series rewrite: /series/:id -> /pages/series/views/:id
			{
				source: '/series/:id',
				destination: '/pages/series/views/:id',
			},
			// Episode rewrite: /series/:id/episode/:episode -> /pages/series/views/:id/:episode
			{
				source: '/series/:id/episode/:episode',
				destination: '/pages/series/views/:id/:episode',
			},
		];
	},
};

module.exports = nextConfig;

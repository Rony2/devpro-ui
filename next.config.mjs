/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		const quizCacheHeaders = [
			{
				key: 'Cache-Control',
				value: 'public, max-age=31536000, s-maxage=31536000, immutable',
			},
			{
				key: 'CDN-Cache-Control',
				value: 'public, s-maxage=31536000, immutable',
			},
			{
				key: 'Vercel-CDN-Cache-Control',
				value: 'public, s-maxage=31536000, immutable',
			},
		];

		return [
			{
				source: '/quiz',
				headers: quizCacheHeaders,
			},
			{
				source: '/quiz/:path*',
				headers: quizCacheHeaders,
			},
		];
	},
};

export default nextConfig;

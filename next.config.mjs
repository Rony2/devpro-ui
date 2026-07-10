/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		const immutableCache = [
			{
				key: 'Cache-Control',
				value: 'public, max-age=31536000, s-maxage=31536000, immutable',
			},
			{
				key: 'CDN-Cache-Control',
				value: 'public, s-maxage=31536000, immutable',
			},
			{
				key: 'Cloudflare-CDN-Cache-Control',
				value: 'public, s-maxage=31536000, immutable',
			},
			{
				key: 'Vercel-CDN-Cache-Control',
				value: 'public, s-maxage=31536000, immutable',
			},
		];

		const pageCache = [
			{
				key: 'Cache-Control',
				value: 'public, max-age=0, s-maxage=5184000, stale-while-revalidate=5184000',
			},
			{
				key: 'CDN-Cache-Control',
				value: 'public, s-maxage=5184000, stale-while-revalidate=5184000',
			},
			{
				key: 'Cloudflare-CDN-Cache-Control',
				value: 'public, s-maxage=5184000, stale-while-revalidate=5184000',
			},
			{
				key: 'Vercel-CDN-Cache-Control',
				value: 'public, s-maxage=5184000, stale-while-revalidate=5184000',
			},
		];

		return [
			// Static assets — immutable, 1 year
			{ source: '/_next/static/:path*', headers: immutableCache },
			{ source: '/icons/:path*', headers: immutableCache },
			{ source: '/og/:path*', headers: immutableCache },
			{ source: '/seo-icon.svg', headers: immutableCache },

			// Quiz pages — immutable (SSG, content baked at build)
			{ source: '/quiz', headers: immutableCache },
			{ source: '/quiz/:path*', headers: immutableCache },

			// Problems — CDN cache 60 days, purged on deploy
			{ source: '/problems', headers: pageCache },
			{ source: '/problems/:path*', headers: pageCache },

			// System design — CDN cache 60 days, purged on deploy
			{ source: '/system-design', headers: pageCache },
			{ source: '/system-design/:path*', headers: pageCache },

			// Marketing pages — CDN cache 60 days, purged on deploy
			{ source: '/', headers: pageCache },
			{ source: '/about', headers: pageCache },
			{ source: '/pricing', headers: pageCache },
		];
	},
};

export default nextConfig;

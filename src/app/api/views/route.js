import { NextResponse } from 'next/server';
import { incrementPageViews, getPageViews } from '@/lib/analytics/pageViews';

const BOT_UA_PATTERN = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|mediapartners|google|baidu|yandex|duckduck|semrush|ahref|mj12|dotbot|petalbot|bytespider|gptbot|claude|chatgpt/i;

function isBot(request) {
	const ua = request.headers.get('user-agent') || '';
	if (BOT_UA_PATTERN.test(ua)) return true;
	// Headless/automated browsers
	if (/headless|phantom|puppeteer|playwright|selenium/i.test(ua)) return true;
	// Missing or very short UA is suspicious
	if (ua.length < 10) return true;
	return false;
}

export async function GET() {
	const count = await getPageViews();
	return NextResponse.json(
		{ views: count },
		{
			headers: {
				'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
			},
		}
	);
}

export async function POST(request) {
	// Ignore bots and crawlers
	if (isBot(request)) {
		const count = await getPageViews();
		return NextResponse.json({ views: count });
	}

	// Session dedup: check cookie to avoid counting refreshes
	const visited = request.cookies.get('dv_counted');
	if (visited) {
		const count = await getPageViews();
		return NextResponse.json({ views: count });
	}

	const count = await incrementPageViews();
	const response = NextResponse.json({ views: count });
	// Set cookie for 24h — same visitor won't increment again today
	response.cookies.set('dv_counted', '1', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 86400, // 24 hours
		path: '/',
	});
	return response;
}

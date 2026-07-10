const ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const NAMESPACE_ID = process.env.CF_KV_NAMESPACE_ID;
const API_TOKEN = process.env.CF_API_TOKEN;
const KV_KEY = 'devpro:page_views:total';

const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/storage/kv/namespaces/${NAMESPACE_ID}`;

async function kvGet(key) {
	const res = await fetch(`${baseUrl}/values/${encodeURIComponent(key)}`, {
		headers: { Authorization: `Bearer ${API_TOKEN}` },
	});
	if (!res.ok) return null;
	return res.text();
}

async function kvPut(key, value) {
	await fetch(`${baseUrl}/values/${encodeURIComponent(key)}`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${API_TOKEN}` },
		body: String(value),
	});
}

export async function getPageViews() {
	const raw = await kvGet(KV_KEY);
	return raw ? parseInt(raw, 10) : 0;
}

export async function incrementPageViews() {
	const current = await getPageViews();
	const next = current + 1;
	await kvPut(KV_KEY, next);
	return next;
}

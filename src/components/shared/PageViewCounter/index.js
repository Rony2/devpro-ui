'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export function PageViewCounter() {
	const [views, setViews] = useState(null);

	useEffect(() => {
		async function trackView() {
			try {
				const res = await fetch('/api/views', { method: 'POST' });
				if (res.ok) {
					const data = await res.json();
					setViews(data.views);
				}
			} catch {
				// Silently fail — counter is non-critical
			}
		}
		trackView();
	}, []);

	if (views === null || views <= 200) return null;

	return (
		<div className="flex justify-center border-t-2 border-[var(--border)] py-3">
			<div className="inline-flex items-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-elevated)] px-3 py-1.5 shadow-[3px_3px_0px_0px_var(--border)]">
				<Eye size={14} className="text-[var(--neo-purple)]" aria-hidden="true" />
				<span className="text-xs font-bold tabular-nums">
					{Number(views).toLocaleString()}
				</span>
				<span className="text-xs text-[var(--text-muted)]">visits</span>
			</div>
		</div>
	);
}

'use client';

import { useEffect, useRef, useState } from 'react';

export function MermaidDiagram({ chart }) {
	const containerRef = useRef(null);
	const [svg, setSvg] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		let cancelled = false;

		async function render() {
			try {
				const mermaid = (await import('mermaid')).default;
				mermaid.initialize({
					startOnLoad: false,
					theme: 'dark',
					themeVariables: {
						primaryColor: '#1a1a2e',
						primaryTextColor: '#ffffff',
						primaryBorderColor: '#5cb8d6',
						lineColor: '#5cb8d6',
						secondaryColor: '#141414',
						tertiaryColor: '#0f0f0f',
						fontFamily: 'var(--font-body), system-ui, sans-serif',
						fontSize: '14px',
						nodeBorder: '#5cb8d6',
						mainBkg: '#1a1a2e',
						clusterBkg: '#141414',
						clusterBorder: '#5cb8d6',
						edgeLabelBackground: '#0a0a0a',
					},
					flowchart: {
						htmlLabels: true,
						curve: 'basis',
						padding: 20,
						nodeSpacing: 50,
						rankSpacing: 60,
					},
				});

				const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
				const { svg: rendered } = await mermaid.render(id, chart);

				// Make SVG responsive: remove fixed height/width, ensure viewBox is preserved
				const responsive = rendered
					// Only replace the root SVG width/height (first occurrence)
					.replace(/(<svg[^>]*?)(\s+height="[^"]*")/, '$1')
					.replace(/(<svg[^>]*?)(\s+width="[^"]*")/, '$1 width="100%"')
					.replace(/<svg /, '<svg style="display:block;min-width:0;overflow:visible;" ')
					// Allow foreignObject (HTML labels) to show full content without clipping
					.replace(/<foreignObject /g, '<foreignObject style="overflow:visible;" ');

				if (!cancelled) setSvg(responsive);
			} catch (e) {
				if (!cancelled) setError(e.message);
			}
		}

		render();
		return () => { cancelled = true; };
	}, [chart]);

	if (error) {
		return (
			<div className="mt-4 border-2 border-[var(--danger)] bg-[var(--code-bg)] p-4">
				<p className="text-xs font-bold text-[var(--danger)]">Diagram render error</p>
				<pre className="mt-2 text-xs text-[var(--text-muted)]">{error}</pre>
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="mt-4 flex h-48 items-center justify-center border-2 border-[var(--border)] bg-[var(--code-bg)]">
				<p className="text-sm text-[var(--text-muted)]">Loading diagram...</p>
			</div>
		);
	}

	return (
		<div
			ref={containerRef}
			className="mermaid-diagram mt-4 overflow-x-auto border-2 border-[var(--border)] bg-[var(--code-bg)] p-6 shadow-[3px_3px_0px_0px_var(--border)]"
			dangerouslySetInnerHTML={{ __html: svg }}
		/>
	);
}

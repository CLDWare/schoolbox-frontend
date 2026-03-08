import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'preact/hooks';

const MockData = [
	{ name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
	{ name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
	{ name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
	{ name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
	{ name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
	{ name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
	{ name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

export function Home() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const computedStyle = getComputedStyle(document.documentElement);
		const getThemeColor = (cssVarName: string, fallback: string) => {
			const value = computedStyle.getPropertyValue(cssVarName).trim();
			if (!value) {
				return fallback;
			}

			return value.includes('(') ? value : `oklch(${value})`;
		};

		const primary = getThemeColor('--color-primary', '#8884d8');
		const baseContent = getThemeColor('--color-base-content', '#333');

		const chart = new Chart(canvas, {
			type: 'bar',
			data: {
				labels: MockData.map((item) => item.name),
				datasets: [
					{
						label: 'UV',
						data: MockData.map((item) => item.uv),
							backgroundColor: primary,
						borderRadius: 4,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					x: {
						ticks: { color: baseContent },
						grid: { color: 'transparent' },
					},
					y: {
						ticks: { color: baseContent },
						grid: { color: 'rgba(127,127,127,0.2)' },
					},
				},
			},
		});

		return () => {
			chart.destroy();
		};
	}, []);

	return (
		<div class="hero bg-base-200 min-h-screen">
			<div class="hero-content text-center">
				<div class="max-w-md">
				<h1 class="text-5xl font-bold">SchoolBox</h1>
				<p class="py-6">
					Dit is de frontend van SchoolBox en ik heb niks om hier te zetten momenteel dus ja dit is er eigenlijk voor geen enkele reden.
				</p>
				</div>
			</div>
		</div>
	);
}
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'preact/hooks';
import type { SessionData } from '../hooks/useSession.ts';

interface SessionChartProps {
    currentSession: SessionData;
}

export function SessionChart({ currentSession }: SessionChartProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    const chartData = currentSession.votes.map((voteCount, index) => ({
        name: `Option ${index + 1}`,
        votes: voteCount,
    }));

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

        // If chart already exists, just update data instead of recreating
        if (chartRef.current) {
            chartRef.current.data.datasets[0].data = chartData.map((item) => item.votes);
            chartRef.current.update('none'); // Update without animation
            return;
        }

        chartRef.current = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: chartData.map((item) => item.name),
                datasets: [
                    {
                        label: 'votes',
                        data: chartData.map((item) => item.votes),
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
                        ticks: {
                            color: baseContent,
                            precision: 0,
                            callback: (value) => {
                                const numericValue = Number(value);
                                return Number.isInteger(numericValue) ? `${numericValue}` : '';
                            },
                        },
                        grid: { color: 'rgba(127,127,127,0.2)' },
                    },
                },
            },
        });

        return () => {
            chartRef.current?.destroy();
            chartRef.current = null;
        };
    }, [chartData, currentSession.id]);

    return (
        <div class="mt-4 h-56 w-full">
			<canvas ref={canvasRef} />
		</div>
    );
}
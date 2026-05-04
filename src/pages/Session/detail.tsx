import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'preact/hooks';
import { useUser } from '../../hooks/useUser.ts';

interface SessionDetailData {
    id: number;
    user_id: number;
    device_id: number;
    question_id: number;
    question: string;
    date: string;
    first_answer_time: string | null;
    last_answer_time: string | null;
    stopped_at: string | null;
    votes: number[];
}

interface ApiResponse<T> {
    status: number;
    success: boolean;
    message: string;
    data: T;
    timestamp: string;
}

interface SessionDetailProps {
    id?: string;
}

export function SessionDetail({ id }: SessionDetailProps) {
    const { user, loading: userLoading, error: userError } = useUser();
    const [session, setSession] = useState<SessionDetailData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!user || !id) {
            setLoading(false);
            return;
        }

        let cancelled = false;

        const fetchSession = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/session/${id}?asRole=0`);
                const data: ApiResponse<SessionDetailData[] | SessionDetailData> = await response.json();

                if (cancelled) {
                    return;
                }

                if (data.success && data.status === 200) {
                    const sessionData = Array.isArray(data.data) ? data.data[0] : data.data;
                    if (sessionData) {
                        setSession(sessionData);
                    } else {
                        setError('Session not found.');
                    }
                } else {
                    setError(data.message || 'Failed to fetch session details.');
                }
            } catch (err) {
                if (!cancelled) {
                    const message = err instanceof Error ? err.message : 'Network error';
                    setError(message);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchSession();

        return () => {
            cancelled = true;
        };
    }, [user?.id, id]);

    useEffect(() => {
        if (!session || !canvasRef.current) {
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

        chartRef.current?.destroy();
        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: session.votes.map((_, index) => `Option ${index + 1}`),
                datasets: [
                    {
                        label: 'Votes',
                        data: session.votes,
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
                        beginAtZero: true,
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
    }, [session?.id, session?.votes.join(',')]);

    if (userLoading || loading) {
        return (
            <div class="hero bg-base-200 min-h-screen">
                <div class="hero-content text-center">
                    <div class="loading loading-spinner loading-lg"></div>
                </div>
            </div>
        );
    }

    if (userError || !user) {
        return (
            <div class="hero bg-base-200 min-h-screen">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-5xl font-bold">Access Denied</h1>
                        <p class="py-6">You must be logged in to access this page.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!id || error || !session) {
        return (
            <div class="hero bg-base-200 min-h-screen">
                <div class="hero-content text-center">
                    <div class="max-w-md">
                        <h1 class="text-4xl font-bold">Session Not Found</h1>
                        <p class="py-6">{error || 'No session id was provided.'}</p>
                        <a href="/session/history" class="btn btn-primary">Back to History</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div class="min-h-screen bg-base-200 p-4">
            <div class="max-w-5xl mx-auto">
                <div class="mb-6 flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                    <div>
                        <h1 class="text-4xl font-bold">Session #{session.id}</h1>
                        <p class="text-base-content/70">{new Date(session.date).toLocaleString()}</p>
                    </div>
                    <a href="/session/history" class="btn btn-outline">Back to History</a>
                </div>

                <div class="card bg-base-100 shadow-xl mb-6">
                    <div class="card-body">
                        <h2 class="card-title">{session.question}</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <p><strong>Device:</strong> {session.device_id}</p>
                            <p><strong>Total Votes:</strong> {session.votes.reduce((acc, count) => acc + count, 0)}</p>
                            <p><strong>Status:</strong> {session.stopped_at ? 'Stopped' : 'Active'}</p>
                        </div>
                    </div>
                </div>

                <div class="card bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">Votes by Option</h2>
                        <div class="h-72 w-full mt-2">
                            <canvas ref={canvasRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

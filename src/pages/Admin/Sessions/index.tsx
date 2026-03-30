import { useEffect, useState } from 'preact/hooks';
import { useUser } from '../../../hooks/useUser.ts';

interface SessionHistoryData {
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

export function Sessions() {
    const { user, loading: userLoading, error: userError } = useUser();
    const [sessions, setSessions] = useState<SessionHistoryData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            return;
        }

        let cancelled = false;

        const fetchSessions = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch('/api/session?asRole=1');
                const data: ApiResponse<SessionHistoryData[]> = await response.json();

                if (cancelled) {
                    return;
                }

                if (data.success && data.status === 200) {
                    const sessionsList = Array.isArray(data.data) ? data.data : [];

                    const sorted = [...sessionsList].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                    setSessions(sorted);
                } else {
                    setError(data.message || 'Failed to fetch session history.');
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

        fetchSessions();

        return () => {
            cancelled = true;
        };
    }, [user?.id]);

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

    return (
        <div class="min-h-screen bg-base-200 p-4">
            <div class="max-w-5xl mx-auto">
                <div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h1 class="text-5xl font-bold text-center md:text-left">Session History</h1>
                    <a href="/session/" class="btn btn-outline">Back to Session Manager</a>
                </div>

                {error && (
                    <div class="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                {sessions.length === 0 ? (
                    <div class="card bg-base-100 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title">No sessions yet</h2>
                            <p>Start a session first, then your history will show up here.</p>
                            <div class="card-actions justify-end">
                                <a href="/session" class="btn btn-primary">Go to Session</a>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div class="overflow-x-auto bg-base-100 rounded-box shadow-xl">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User ID</th>
                                    <th>Question</th>
                                    <th>Device</th>
                                    <th>Total Votes</th>
                                    <th>Started</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session) => (
                                    <tr key={session.id}>
                                        <td>{session.id}</td>
                                        <td>{session.user_id}</td>
                                        <td class="max-w-xs truncate" title={session.question}>{session.question}</td>
                                        <td>{session.device_id}</td>
                                        <td>{session.votes.reduce((acc, count) => acc + count, 0)}</td>
                                        <td>{new Date(session.date).toLocaleString()}</td>
                                        <td>
                                            {session.stopped_at ? (
                                                <span class="badge badge-ghost">Stopped</span>
                                            ) : (
                                                <span class="badge badge-success">Active</span>
                                            )}
                                        </td>
                                        <td>
                                            <a class="btn btn-sm btn-outline" href={`/session/history/${session.id}`}>
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
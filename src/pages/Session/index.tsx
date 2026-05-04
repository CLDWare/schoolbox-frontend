import { useState } from 'preact/hooks';
import { useUser } from '../../hooks/useUser.ts';
import { useDeviceNames } from '../../hooks/useDeviceNames.ts';
import { useSession } from '../../hooks/useSession.ts';

import { SessionChart } from '../../components/SessionChart.tsx';

export function Session() {
    const { user, loading: userLoading } = useUser();
    const { devices, loading: devicesLoading, refetch: refetchDevices } = useDeviceNames();
    const { currentSession, loading: sessionLoading, error, startSession, stopSession, refetchSession: _refetchSession } = useSession();
    const [selectedDeviceId, setSelectedDeviceId] = useState<number | ''>('');
    const [question, setQuestion] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    if (userLoading || devicesLoading || sessionLoading) {
        return (
            <div class="hero bg-base-200 min-h-screen">
                <div class="hero-content text-center">
                    <div class="loading loading-spinner loading-lg"></div>
                </div>
            </div>
        );
    }

    if (!user) {
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

    const handleStartSession = async (e: Event) => {
        e.preventDefault();
        if (!selectedDeviceId || !question.trim()) {
            setMessage('Please select a device and enter a question.');
            return;
        }
        setMessage(null);
        const result = await startSession(Number(selectedDeviceId), question.trim());
        setMessage(result.message);
        if (result.success) {
            setSelectedDeviceId('');
            setQuestion('');
            refetchDevices(); // Refresh device availability
        }
    };

    const handleStopSession = async () => {
        setMessage(null);
        const result = await stopSession();
        setMessage(result.message);
        if (result.success) {
            refetchDevices(); // Refresh device availability
        }
    };

    const availableDevices = devices.filter(d => d.available); // Only available devices

    return (
        <div class="min-h-screen bg-base-200 p-4">
            <div class="max-w-4xl mx-auto">
                <div class="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <h1 class="text-5xl font-bold text-center md:text-left">Session Management</h1>
                    <a href="/session/history" class="btn btn-outline">My Session History</a>
                </div>

                {error && (
                    <div class="alert alert-error mb-4">
                        <span>{error}</span>
                    </div>
                )}

                {message && (
                    <div class={`alert ${message.includes('success') || message === 'Ok' ? 'alert-success' : 'alert-info'} mb-4`}>
                        <span>{message}</span>
                    </div>
                )}

                {currentSession ? (
                    <div class="card bg-base-100 shadow-xl mb-8">
                        <div class="card-body">
                            <h2 class="card-title">Current Session</h2>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p><strong>Question:</strong> {currentSession.question}</p>
                                    <p><strong>Device ID:</strong> {currentSession.device_id}</p>
                                    <p><strong>Started:</strong> {new Date(currentSession.date).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p><strong>Session ID:</strong> {currentSession.id}</p>
                                    <p><strong>Question ID:</strong> {currentSession.question_id}</p>
                                    <p><strong>Votes:</strong> {currentSession.votes.length}</p>
                                </div>
                            </div>
                            <div class="card-actions justify-end">
                                <button
                                    type="button"
                                    class="btn btn-error"
                                    onClick={handleStopSession}
                                    disabled={sessionLoading}
                                >
                                    {sessionLoading ? <span class="loading loading-spinner"></span> : 'Stop Session'}
                                </button>
                            </div>
                        </div>
                        <SessionChart currentSession={currentSession} />
                    </div>
                ) : (
                    <div class="card bg-base-100 shadow-xl mb-8">
                        <div class="card-body">
                            <h2 class="card-title">Start New Session</h2>
                            <form onSubmit={handleStartSession}>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Select Device</span>
                                    </label>
                                    <select
                                        class="select select-bordered"
                                        value={selectedDeviceId}
                                        onChange={(e) => setSelectedDeviceId(Number((e.target as HTMLSelectElement).value))}
                                        required
                                    >
                                        <option value="" disabled>Select a device</option>
                                        {availableDevices.map(device => (
                                            <option key={device.id} value={device.id}>
                                                Device {device.id}{device.room ? ` - Room: ${device.room}` : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div class="form-control mb-4">
                                    <label class="label">
                                        <span class="label-text">Question</span>
                                    </label>
                                    <textarea
                                        class="textarea textarea-bordered"
                                        placeholder="Enter your question..."
                                        value={question}
                                        onInput={(e) => setQuestion((e.target as HTMLTextAreaElement).value)}
                                        required
                                    />
                                </div>
                                <div class="card-actions justify-end">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                        disabled={sessionLoading || availableDevices.length === 0}
                                    >
                                        {sessionLoading ? <span class="loading loading-spinner"></span> : 'Start Session'}
                                    </button>
                                </div>
                            </form>
                            {availableDevices.length === 0 && (
                                <p class="text-warning mt-4">No available devices. All devices are currently in use.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
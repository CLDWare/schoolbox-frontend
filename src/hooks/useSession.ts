import { useState, useCallback, useEffect } from 'preact/hooks';

export interface SessionData {
  id: number;
  user_id: number;
  device_id: number;
  question_id: number;
  question: string;
  date: string;
  first_answer_time: string;
  last_answer_time: string;
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

interface StartSessionRequest {
  device_id: number;
  question: string;
}

export function useSession() {
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentSession = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/session/current');
      const data: ApiResponse<SessionData> = await response.json();
      if (data.success && data.status === 200) {
        setCurrentSession(data.data);
      } else if (data.status === 404) {
        // No current session, which is fine
        setCurrentSession(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentSession();
  }, [fetchCurrentSession]);

  // Auto-poll for vote updates every 2 seconds when a session is active
  useEffect(() => {
    if (!currentSession) {
      return;
    }

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/session/current');
        const data: ApiResponse<SessionData> = await response.json();
        if (data.success && data.status === 200) {
          // Only update state if votes have changed
          const newVotes = data.data.votes;
          setCurrentSession((prev) => {
            if (!prev) return data.data;
            const votesChanged = prev.votes.some((v, i) => v !== newVotes[i]) || prev.votes.length !== newVotes.length;
            return votesChanged ? data.data : prev;
          });
        }
      } catch (err) {
        // Silently ignore polling errors
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [currentSession?.id]);

  const startSession = useCallback(async (deviceId: number, question: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ device_id: deviceId, question }),
      });
      const data: ApiResponse<SessionData> = await response.json();
      if (data.success) {
        setCurrentSession(data.data);
        return { success: true, message: data.message };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  const stopSession = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/session/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data: ApiResponse<SessionData> = await response.json();
      if (data.success) {
        setCurrentSession(null);
        return { success: true, message: data.message };
      } else {
        setError(data.message);
        return { success: false, message: data.message };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Network error';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    currentSession,
    loading,
    error,
    startSession,
    stopSession,
    refetchSession: fetchCurrentSession,
  };
}
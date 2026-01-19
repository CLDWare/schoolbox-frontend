import { useEffect, useState, useCallback } from 'preact/hooks';

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

export interface Device {
  active_session_id: number;
  id: number;
  last_seen: string;
  latest_login: string;
  lease_start?: string | null;
  registration_date: string;
  room: string;
}

interface DevicesApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: Device[];
  timestamp: string;
}

export function useDevices(initial?: { limit?: number; offset?: number; leased?: boolean | null }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState({
    limit: initial?.limit ?? 20,
    offset: initial?.offset ?? 0,
    leased: initial?.leased ?? null,
  });

  const fetchDevices = useCallback(async (p = params) => {
    setLoading(true);
    setError(null);
    try {
      const q = new URLSearchParams();
      q.set('limit', String(p.limit));
      q.set('offset', String(p.offset));
      if (p.leased !== null && p.leased !== undefined) q.set('leased', String(p.leased));
      const res = await fetch(`/api/device?${q.toString()}`);
      const body: DevicesApiResponse = await res.json();
      if (body.success && body.status === 200) {
        setDevices(body.data);
      } else {
        setError(body.message || 'Unexpected response');
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const register = useCallback(async (pin: string): Promise<{ success: boolean; message: string }> => {
    if (!/^[0-9]{4}$/.test(pin)) {
      return { success: false, message: 'Pin must be exactly 4 digits.' };
    }
    try {
      const res = await fetch('/api/device/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: Number(pin) }),
      });
      const body = await res.json();
      if (res.ok && body.success) {
        await fetchDevices();
        return { success: true, message: 'Device registered.' };
      } else {
        return { success: false, message: body.message || 'Register failed' };
      }
    } catch (e: unknown) {
      return { success: false, message: e instanceof Error ? e.message : 'Network error' };
    }
  }, [fetchDevices]);

  return {
    devices,
    loading,
    error,
    refetch: () => fetchDevices(),
    setParams,
    register,
    formatDate,
  };
}
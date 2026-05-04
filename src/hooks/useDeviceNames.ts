import { useEffect, useState, useCallback } from 'preact/hooks';

export interface DeviceNames {
  available: boolean;
  id: number;
  room: string | null;
}

interface DeviceApiItem {
  available?: boolean;
  id: number;
  leased?: boolean;
  active_session_id?: number | null;
  room?: string | null;
}

interface DeviceApiResponse {
  status: number;
  success: boolean;
  message: string;
  data: DeviceApiItem[];
  timestamp: string;
}

export function useDeviceNames() {
    const [devices, setDevices] = useState<DeviceNames[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDeviceNames = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/device/names');
            if (!res.ok) {
                throw new Error(`Failed to fetch devices: ${res.statusText}`);
            }
            const body: DeviceApiResponse = await res.json();
            if (body.success && body.status === 200) {
                const normalizedDevices: DeviceNames[] = body.data.map((device) => {
                    const available =
                        typeof device.available === 'boolean'
                            ? device.available
                            : typeof device.leased === 'boolean'
                                ? !device.leased
                                : device.active_session_id == null || device.active_session_id === 0;

                    return {
                        id: device.id,
                        room: device.room ?? null,
                        available,
                    };
                });

                setDevices(normalizedDevices);
                setError(null);
            } else {
                setError(body.message || 'Failed to fetch devices');
                setDevices([]);
            }
        } catch (e: unknown) {
            const errorMsg = e instanceof Error ? e.message : 'Failed to fetch devices';
            console.error(errorMsg);
            setError(errorMsg);
            setDevices([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDeviceNames();
    }, []);

    const refetch = useCallback(async () => {
        await fetchDeviceNames();
    }, [fetchDeviceNames]);

    return {
        devices,
        loading,
        error,
        refetch,
    };
}

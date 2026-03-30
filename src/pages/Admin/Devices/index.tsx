import { useState } from 'preact/hooks';
import { useDevices } from '../../../hooks/useDevices.ts';

export function AllDevices() {
  const { devices, loading, error, register, relink, deleteDevice, formatDate } = useDevices();
  const [pin, setPin] = useState('');
  const [relinkDeviceId, setRelinkDeviceId] = useState('');
  const [relinkPin, setRelinkPin] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const result = await register(pin);
    setMsg(result.message);
    if (result.success) {
      setPin('');
    }
  };

  const handleRelinkSubmit = async (e: Event) => {
    e.preventDefault();
    const result = await relink(relinkDeviceId, relinkPin);
    setMsg(result.message);
    if (result.success) {
      setRelinkDeviceId('');
      setRelinkPin('');
    }
  };

  const handleDelete = async (id: number, room: string) => {
    if (!confirm(`Are you sure you want to delete device ${id} (${room})?`)) {
      return;
    }
    const result = await deleteDevice(id);
    setMsg(result.message);
  };

  return (
    <div class="min-h-screen bg-base-200 p-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-5xl font-bold text-center mb-8">Devices</h1>
        
        <div class="card bg-base-100 shadow-xl mb-8">
          
          <div class="card-body items-center text-center">
            <h2 class="card-title">Link a new device</h2>
            <form onSubmit={handleSubmit} class="w-full">
              <div class="join">
                <input
                  class="input validator input-bordered join-item"
                  placeholder="4 Digit pin"
                  pattern="[0-9]{4}"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  value={pin}
                  onInput={(e: Event) => setPin((e.target as HTMLInputElement).value)}
                />
                <button type="submit" class="btn btn-primary join-item rounded-r-m">Link Device</button>
              </div>
              <p class="validator-hint mt-2 text-left">Input must be 4 digit pin containing only numbers.</p>
              {msg && <p class="mt-2 text-left">{msg}</p>}
            </form>
          </div>
          <div class="card-body items-center text-center">
            <h2 class="card-title">Relink an existing device</h2>
            <form onSubmit={handleRelinkSubmit} class="w-full">
              <div class="join w-full">
                <input
                  class="input validator input-bordered join-item w-1/2"
                  placeholder="Device ID"
                  pattern="[0-9]+"
                  inputMode="numeric"
                  required
                  value={relinkDeviceId}
                  onInput={(e: Event) => setRelinkDeviceId((e.target as HTMLInputElement).value)}
                />
                <input
                  class="input validator input-bordered join-item w-1/2"
                  placeholder="4 Digit pin"
                  pattern="[0-9]{4}"
                  inputMode="numeric"
                  maxLength={4}
                  required
                  value={relinkPin}
                  onInput={(e: Event) => setRelinkPin((e.target as HTMLInputElement).value)}
                />
                <button type="submit" class="btn btn-secondary join-item">Relink Device</button>
              </div>
              <p class="validator-hint mt-2 text-left">Input must be a numeric device ID and 4 digit pin.</p>
              {msg && <p class="mt-2 text-left">{msg}</p>}
            </form>
          </div>
        </div>
        <div class="divider lg:divider-horizontal"></div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <div class="overflow-x-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Registration Date</th>
                    <th>Last Seen</th>
                    <th>Lastest Login</th>
                    <th>Room</th>
                    <th>Active Session</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7}>Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={7}>Error: {error}</td></tr>
                  ) : devices.length === 0 ? (
                    <tr><td colSpan={7}>No devices</td></tr>
                  ) : (
                    devices.map(d => (
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{formatDate(d.registration_date)}</td>
                        <td>{formatDate(d.last_seen)}</td>
                        <td>{formatDate(d.latest_login)}</td>
                        <td>{d.room}</td>
                        <td>{d.active_session_id || 'None'}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-error btn-sm"
                            onClick={() => handleDelete(d.id, d.room)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

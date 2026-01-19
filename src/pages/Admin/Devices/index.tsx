import { useState } from 'preact/hooks';
import { useDevices } from '../../../hooks/useDevices.ts';

export function AllDevices() {
  const { devices, loading, error, register, formatDate } = useDevices();
  const [pin, setPin] = useState('');
  const [msg, setMsg] = useState<string | null>(null);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const result = await register(pin);
    setMsg(result.message);
    if (result.success) {
      setPin('');
    }
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
        </div>

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
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6}>Loading...</td></tr>
                  ) : error ? (
                    <tr><td colSpan={6}>Error: {error}</td></tr>
                  ) : devices.length === 0 ? (
                    <tr><td colSpan={6}>No devices</td></tr>
                  ) : (
                    devices.map(d => (
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{formatDate(d.registration_date)}</td>
                        <td>{formatDate(d.last_seen)}</td>
                        <td>{formatDate(d.latest_login)}</td>
                        <td>{d.room}</td>
                        <td>{d.active_session_id || 'None'}</td>
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
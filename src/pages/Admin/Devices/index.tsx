export function AllDevices() {
    return (
        <div class="min-h-screen bg-base-200 p-4">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-5xl font-bold text-center mb-8">Devices</h1>
                
                <div class="card bg-base-100 shadow-xl mb-8">
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">Link a new device</h2>
                        <div class="join">
                            <input class="input validator input-bordered join-item" placeholder="4 Digit pin" pattern="[0-9]{4}" inputMode="numeric" maxLength={4} required />
                            <button type="submit" class="btn btn-primary join-item rounded-r-m">Link Device</button>
                        </div>
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
                                    <tr>
                                        <td>1</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>101</td>
                                        <td>None</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>202</td>
                                        <td>
                                            <button type="button" className="btn btn-primary btn-s">View Session</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>19/01/26</td>
                                        <td>303</td>
                                        <td>None</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
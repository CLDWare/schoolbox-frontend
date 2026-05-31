import type { PageServerLoad } from './$types';
import type { ApiResponse, Session, DeviceNames } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const [sessionRes, historyRes, devicesRes] = await Promise.all([
		fetch('/api/session/current'),
		fetch('/api/session'),
		fetch('/api/device/names')
	]);

	const [session, history, devices] = await Promise.all([
		sessionRes.json() as Promise<ApiResponse<Session>>,
		historyRes.json() as Promise<ApiResponse<Session[]>>,
		devicesRes.json() as Promise<ApiResponse<DeviceNames[]>>
	]);

	return { session, history, devices };
};

export const actions = {
	sessionstop: async ({ fetch }) => {
		await fetch(`/api/session/stop`, { method: 'POST' });
	},
	sessionstart: async ({ fetch, request }) => {
		const data = await request.formData();
		const device_id = Number(data.get('device_id'));
		const question = String(data.get('question'));

		await fetch(`/api/session`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ device_id, question })
		});

		console.log(device_id, question);

		return { success: true };
	}
};

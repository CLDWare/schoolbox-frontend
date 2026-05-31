import type { PageServerLoad } from './$types';
import type { ApiResponse, Device } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/device');
	const devices: ApiResponse<Device[]> = await res.json();
	return { devices };
}) satisfies PageServerLoad;

export const actions = {
	unlink: async ({ fetch, request }) => {
		const data = await request.formData();
		const id = data.get('device_id');
		await fetch(`/api/device/${id}`, { method: 'DELETE' });
	},
	changeroom: async ({ fetch, request }) => {
		const data = await request.formData();
		const room = data.get('room');
		const id = data.get('device_id');
		console.log(room);
		await fetch(`/api/device/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ room })
		});
	},
	link: async ({ fetch, request }) => {
		const data = await request.formData();
		const pin = Number(data.get('pin'));
		await fetch(`/api/device/register`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pin })
		});
	},
	relink: async ({ fetch, request }) => {
		const data = await request.formData();
		const pin = Number(data.get('pin'));
		const device_id = Number(data.get('id'));
		await fetch(`/api/device/relink`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pin, device_id })
		});
	}
};

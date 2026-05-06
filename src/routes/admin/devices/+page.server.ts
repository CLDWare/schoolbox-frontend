import type { PageServerLoad, Actions } from './$types';
import type { ApiResponse, Device } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/device');
	const devices: ApiResponse<Device[]> = await res.json();
	return { devices };
}) satisfies PageServerLoad;

export const actions = {
	unlink: async (event) => {
		// TODO unlink devicw
  },
  link: async (event) => {
		// TODO link device
  },
  relink: async (event) => {
		// TODO relink device
	}
} satisfies Actions;

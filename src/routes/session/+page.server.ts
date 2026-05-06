import type { PageServerLoad } from './$types';
import type { ApiResponse, Session } from '$lib/types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/api/session/current');
	const session: ApiResponse<Session> = await res.json();
	return { session };
};

import type { PageServerLoad } from './$types';
import type { ApiResponse, Session } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/session?asRole=1');
	const sessions: ApiResponse<Session[]> = await res.json();
	return { sessions };
}) satisfies PageServerLoad;

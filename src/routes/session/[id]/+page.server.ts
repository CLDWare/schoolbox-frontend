import type { PageServerLoad } from './$types';
import type { ApiResponse, Session } from '$lib/types';

export const load = (async ({ fetch, params }) => {
	const res = await fetch(`/api/session/${params.id}`);
	const session: ApiResponse<Session> = await res.json();
	return { session };
}) satisfies PageServerLoad;

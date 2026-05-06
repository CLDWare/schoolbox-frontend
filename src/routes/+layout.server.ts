import type { LayoutServerLoad } from './$types';
import type { ApiResponse, User } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/me');
	const me: ApiResponse<User> = await res.json();
	return { me };
}) satisfies LayoutServerLoad;

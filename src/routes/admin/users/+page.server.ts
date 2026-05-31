import type { PageServerLoad } from './$types';
import type { ApiResponse, User } from '$lib/types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/user');
	const user: ApiResponse<User[]> = await res.json();
	return { user };
}) satisfies PageServerLoad;

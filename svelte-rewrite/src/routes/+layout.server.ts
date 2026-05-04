import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch }) => {
	const res = await fetch('/api/me');
	const me = await res.json();
	return { me };
}) satisfies LayoutServerLoad;

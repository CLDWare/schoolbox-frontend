import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { ApiResponse, User } from '$lib/types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const data = (await parent()) as { me: ApiResponse<User> };

	if (!data.me.success || data.me.data.role !== 1) {
		redirect(303, '/');
	}
};

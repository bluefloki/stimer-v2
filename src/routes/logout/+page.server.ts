import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { APP_PASSWORD, APP_USERNAME } from '$env/static/private';

export const load: PageServerLoad = async () => {
	throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		// eat the cookie
		cookies.set('session', '', {
			path: '/',
			expires: new Date(0)
		});

		// redirect the user
		throw redirect(302, '/login');
	}
};

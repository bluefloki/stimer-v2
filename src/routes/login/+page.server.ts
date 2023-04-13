import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { APP_PASSWORD, APP_USERNAME } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/app');
	}
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const data = Object.fromEntries(await request.formData());
		const { username, password } = data as any;

		if (password !== APP_PASSWORD || username !== APP_USERNAME) {
			return fail(400, { credentials: true });
		}
		// generate new auth token just in case
		const userAuthToken = crypto.randomUUID();
		cookies.set('session', userAuthToken, {
			// send cookie for every page
			path: '/',
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: 'strict',
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === 'production',
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 7
		});
		// redirect the user
		throw redirect(302, '/app');
	}
};

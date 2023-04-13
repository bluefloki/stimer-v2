import { APP_USERNAME } from '$env/static/private';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session');

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event);
	}

	// if `user` exists set `events.local`
	event.locals.user = {
		name: APP_USERNAME,
		role: 'admin'
	};

	// load page as normal
	return await resolve(event);
};

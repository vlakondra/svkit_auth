import type { Handle } from '@sveltejs/kit';
//import * as auth from '$lib/server/auth.js';

import { lucia } from '$lib/server/lucia_auth'

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	//old const sessionToken = event.cookies.get(auth.sessionCookieName);

	console.log(event.locals.session, event.locals.user, sessionId, lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		console.log('проверка logout')
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	console.log('fin', event.locals.user, event.locals.session)
	return resolve(event);

};

export const handle: Handle = handleAuth;

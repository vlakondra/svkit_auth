import type { Handle } from '@sveltejs/kit';
import { lucia } from '$lib/server/lucia_auth'

//Код взят: https://v3.lucia-auth.com/getting-started/sveltekit
const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	console.log(event.locals.session, event.locals.user, sessionId, lucia.sessionCookieName);

	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	//https://v3.lucia-auth.com/guides/validate-session-cookies/sveltekit
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

import { lucia } from "$lib/server/lucia_auth";
import { json, redirect } from "@sveltejs/kit";
import { type RequestHandler, type RequestEvent } from '@sveltejs/kit';

export const POST: RequestHandler = async (event: RequestEvent) => {
    // if (!event.locals.session) {
    //      return redirect(302, '/');
    //что делать если пользователь не авторизован, но  выполняет logout
    // }

    if (event.locals.session) {
        await lucia.invalidateSession(event.locals.session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }

    // Возвращаем JSON для fetch-запросов
    if (event.request.headers.get('accept')?.includes('application/json')) {
        console.log('json?')
        return json({ success: true });
    }

    return redirect(302, "/");
};
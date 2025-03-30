import { lucia } from "$lib/server/lucia_auth";
import { json, redirect } from "@sveltejs/kit";
import { type RequestHandler, type RequestEvent } from '@sveltejs/kit';


//Код взят: https://v3.lucia-auth.com/tutorials/username-and-password/sveltekit
//запрос на logout
export const POST: RequestHandler = async (event: RequestEvent) => {
    //функция не может быть выполнена из браузера и это хорошо

    // if (!event.locals.session) {
    //      return redirect(302, '/');
    //что делать если пользователь не авторизован, но  выполняет logout
    // }

    if (event.locals.session) {
        //чистим табл. session
        await lucia.invalidateSession(event.locals.session.id);
        //чистим cookies
        const sessionCookie = lucia.createBlankSessionCookie();
        console.log('sessionCookie.value', sessionCookie.value)
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }

    // fetch-запросы должны возвращать JSON
    if (event.request.headers.get('accept')?.includes('application/json')) {
        console.log('json?')
        return json({ success: true });
    }
    //это сработает, если запрос будет Не fetch (не json)
    return redirect(302, "/");
};
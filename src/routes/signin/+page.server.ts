import type { Actions, PageServerLoad } from './$types';

import { lucia } from "$lib/server/lucia_auth";
import { fail, redirect } from "@sveltejs/kit";
import { verify } from "@node-rs/argon2";
import { eq } from 'drizzle-orm'
import { db } from "$lib/server/db";
import * as table from '$lib/server/db/schema'


//код взят: https://v3.lucia-auth.com/tutorials/username-and-password/sveltekit
//Action формы входа
export const actions: Actions = {
    signin: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const password = formData.get("password"); 
    
        if (
			typeof username !== "string" ||
			username.length < 3 ||
			username.length > 31 ||
			!/^[a-z0-9_-]+$/.test(username)
		) {
			return fail(400, {
				message: "Invalid username"
			});
		}
    
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: "Invalid password"
			});
		}

        const existingUser =  db
        .select()
        .from(table.user)
        .where(eq(table.user.username, username))
        .get();
        
        if (!existingUser) {
            return fail(400, {
                message: "Incorrect username or password"
            });
        }

        if (typeof password !== "string") {
            return fail(400, {
                message: "Invalid password"
            });
        }

        const validPassword:boolean = await verify(existingUser.passwordHash, password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        
        if (!validPassword) {
            return fail(400, {
                message: "Incorrect username or password"
            });
        }
        //1 мес в милисек
        const  expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
        const session = await lucia.createSession(existingUser.id, expiresAt);
       // console.log('signIn-session', session)

		const sessionCookie = lucia.createSessionCookie(session.id);

        //Проверка: удалить cookie, и сессию в таблице -> залогиниться

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: ".",
			...sessionCookie.attributes
		});
    }
}

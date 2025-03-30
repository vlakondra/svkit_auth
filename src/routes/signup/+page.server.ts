import type { Actions, PageServerLoad } from './$types';
import { lucia } from "$lib/server/lucia_auth";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import {eq} from "drizzle-orm"
import { db } from "$lib/server/db";
import * as table from '$lib/server/db/schema'


//код взят: https://v3.lucia-auth.com/tutorials/username-and-password/sveltekit
//Action формы регистрации
export const actions: Actions = {
    register: async (event) => {
        const formData = await event.request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
        // keep in mind some database (e.g. mysql) are case insensitive
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
        //запрет на 2 одинаковых имени
        const currUser = db
        .select()
        .from(table.user)
        .where(eq(table.user.username, username))
        .get();

        if(currUser){
            return fail(400, {
                message: `Пользователь ${username} уже существует`
            }); 
        }

        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return fail(400, {
                message: "Invalid password"
            });
        }

        const userId = generateIdFromEntropySize(10); // 16 characters long
        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        
        await db.insert(table.user).values({
            id: userId,
            username: username,
            passwordHash: passwordHash
        });
        console.log('after insert', userId)

        const  expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
        console.log('date?',expiresAt) 
        const session = await lucia.createSession(userId, expiresAt);
        console.log('after createSession', session)

        const sessionCookie = lucia.createSessionCookie(session.id);
        console.log(sessionCookie.attributes)

        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });

        redirect(302, "/");
    }
};
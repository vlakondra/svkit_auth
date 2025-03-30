import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

import { db } from "$lib/server/db"
import { session, user } from "../server/db/schema"

const adapter = new DrizzleSQLiteAdapter(db, session, user)




export const lucia = new Lucia(adapter, {
    sessionCookie: {
        name: 'auth_session',
        expires: false, /*????*/
     
        attributes: {
            // set to `true` when using HTTPS
            secure: !dev,
        }
    },
    getUserAttributes: (attributes) => {
        return {
            // attributes has the type of DatabaseUserAttributes
            //в рез-те на странице можно увидеть только username,
            //а остальные поля - нет
            username: attributes.username,
        };
    },
    //name: 'auth_session'
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    username: string;
}
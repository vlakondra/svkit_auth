import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';
import * as relations from './relations';
import { env } from '$env/dynamic/private';


//process.env.CHINOOK_URL
if (!env.CHINOOK_URL) throw new Error('CHINOOK_URL is not set');

const client = new Database(env.CHINOOK_URL);

export const chinookdb = drizzle(client, { schema:{...schema,...relations }});
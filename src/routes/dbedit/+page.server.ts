import type { PageServerLoad } from './$types';
//import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { chinookdb } from '$lib/server/chinook';
import { artists, albums } from '$lib/server/chinook/schema';
import { sql, eq } from 'drizzle-orm';

export const load = (async () => {
    return {something:333};
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request }) => {

        const data = await request.formData();
        const art: string = data.get('artist')
        const alb: FormDataEntryValue | null = data.get('album')

        try {
            const artId = await chinookdb
                .select()
                .from(artists)
                .where(eq(artists.name, art))

            console.log(artId[0].artistId)

            if (artId[0]?.artistId) {
                await chinookdb
                    .insert(albums)
                    .values({ title: alb, artistId: artId[0].artistId });
            }
            return { message: 'Альбом добавлен' }

        } catch (error) {
            return fail(422, {
                artist: data.get('artist'),
                album: data.get('album'),
                //error: error.message
            })
        }
    }
}

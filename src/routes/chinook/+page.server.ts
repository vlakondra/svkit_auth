import type { PageServerLoad } from './$types';
import { albums, tracks, artists } from '$lib/server/chinook/schema'
import { eq, lt } from 'drizzle-orm';
import type { Albums, Artists } from '$lib/server/chinook/schema'
import { chinookdb } from '$lib/server/chinook';

type ArtWithAlbums = Artists & { albums: Albums[] }


export const load = (async () => {
    const art_data: Artists[] = await chinookdb
        .select()
        .from(artists)

    //https://orm.drizzle.team/docs/rqb 
     
    const result: ArtWithAlbums[] = await chinookdb.query.artists.findMany({
        where: (artists, { lt }) => (lt(artists.artistId, 3)),
        with: {
            albums: true
        },
    }); 
    
    const result2 = await chinookdb.query.albums.findMany({
        where: (albums, { eq }) => (eq(albums.title, 'Dark Side Of The Moon')),
        with:{tracks:true}
    })

    const result3 = await chinookdb.query.artists.findMany({
        where: (artists, { eq }) => (eq(artists.name, 'Pink Floyd')),
        with: {albums: true}
    });



    // const result = await chinookdb.query.albums.findMany({
    //      with: { tracks: true }, 

    console.log(result3)
    return { result3 };
}) satisfies PageServerLoad;
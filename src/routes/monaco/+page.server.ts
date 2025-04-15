import type { PageServerLoad } from './$types';

export const load = (async () => {
    return {message:123};
}) satisfies PageServerLoad;


export const actions = {
    create: async ({ request }) => {

        return {message:'test'}
    }}
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ locals }) => {
    //console.log(locals)

    return {
        user: locals.user,
    }
}

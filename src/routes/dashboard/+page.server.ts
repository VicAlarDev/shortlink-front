import type { ServerLoad } from '@sveltejs/kit'
import type { UserLinksStatsResponse } from '$lib/utils'

export const load: ServerLoad = async ({ fetch, locals }) => {
    const { user } = locals

    if (!user) {
        throw new Error('User not found')
    }

    const response = await fetch(`http://localhost:3000/api/user/links/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch link')
    }

    const data: UserLinksStatsResponse = await response.json()

    return {
        link: data,
    }
}

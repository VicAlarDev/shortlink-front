import type { ServerLoad } from '@sveltejs/kit'
import { BACKEND_URL } from '$lib/constants/link'

export const load: ServerLoad = async ({ fetch, parent }) => {
    const { user } = await parent()

    if (!user) {
        throw new Error('User not found')
    }

    const response = await fetch(`${BACKEND_URL}/api/all`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch links')
    }

    const data = await response.json()

    return {
        links: data,
        user,
        title: 'Links - Shortlink',
    }
}

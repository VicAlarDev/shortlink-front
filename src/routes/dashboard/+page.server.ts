import type { ServerLoad } from '@sveltejs/kit'
import { _ } from 'svelte-i18n'
import type { UserLinksStatsResponse } from '$lib/utils'
import { BACKEND_URL } from '$lib/constants/link'

export const load: ServerLoad = async ({ fetch, locals }) => {
    const { user } = locals

    if (!user) {
        throw new Error('User not found')
    }

    const response = await fetch(`${BACKEND_URL}/api/user/links/stats`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })

    console.log(response)

    if (!response.ok) {
        throw new Error('Failed to fetch link')
    }

    const data: UserLinksStatsResponse = await response.json()

    return {
        link: data,
        title: 'Dashboard - Shortlink',
    }
}

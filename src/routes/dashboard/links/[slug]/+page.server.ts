import type { ServerLoad } from '@sveltejs/kit'
import { getLastSegment } from '$lib/utils'
import { BACKEND_URL } from '$lib/constants/link'

export const load: ServerLoad = async ({ fetch, params, parent }) => {
    const { slug } = params
    const { user } = await parent()

    const response = await fetch(`${BACKEND_URL}/api/url/${slug}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch link')
    }

    const data = await response.json()

    return {
        link: data,
        title: `Stats for Link: ${getLastSegment(data.shortCode)}`,
        metaDescription: `Detailed statistics for the link ${getLastSegment(data.shortCode)}. Total clicks, unique visitors, and more.`,
    }
}

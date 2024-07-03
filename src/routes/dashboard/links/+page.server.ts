// src/routes/dashboard/+page.server.ts
import type { ServerLoad } from '@sveltejs/kit'

export const load: ServerLoad = async ({ fetch, parent }) => {
    // Accede a los datos del layout a través de parent
    const { user } = await parent()

    if (!user) {
        throw new Error('User not found')
    }

    const response = await fetch('http://localhost:3000/api/all', {
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
    }
}

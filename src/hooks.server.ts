import { authenticateUser } from '$lib/server/auth'
import { redirect, type Handle } from '@sveltejs/kit'

// Define the routes that we want to be possible to access without auth
const public_paths = ['/signup', '/login']

// Function to verify if the request path is inside the public_paths array
function isPathAllowed(path: string) {
    return public_paths.some(
        (allowedPath) =>
            path === allowedPath || path.startsWith(allowedPath + '/')
    )
}

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.user = await authenticateUser(event)

    const url = new URL(event.request.url)

    // If the token is invalid or doesn't exist, and the path is not allowed, redirect to login
    if (!event.locals.user && !isPathAllowed(url.pathname)) {
        throw redirect(302, '/login')
    }

    // If the user is authenticated and tries to access public paths, redirect to dashboard
    if (event.locals.user && isPathAllowed(url.pathname)) {
        throw redirect(302, '/dashboard')
    }

    const response = await resolve(event)

    return response
}

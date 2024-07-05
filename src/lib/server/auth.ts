import type { RequestEvent } from '@sveltejs/kit'
import { BACKEND_URL } from '$lib/constants/link'

export const authenticateUser = async (event: RequestEvent) => {
    const token = event.cookies.get('shortlink-token')

    if (!token) {
        return null // Token no existe
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/validate`, {
            method: 'POST',
            body: JSON.stringify({ token }),
        })

        if (response.ok) {
            const data = await response.json()
            const user = {
                token: token,
                userId: data.user,
            }
            return user // Token válido
        } else {
            console.error('Error validating token:', response.status)
            return null // Token inválido
        }
    } catch (error) {
        console.error('Error validating token:', error)
        return null // Error en la validación
    }
}

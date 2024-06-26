export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null
    }
    return null
}

export function setCookie(
    name: string,
    value: string,
    days?: number,
    sameSite: 'Strict' | 'Lax' | 'None' = 'Lax',
    secure: boolean = false
): void {
    let expires = ''
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = `; expires=${date.toUTCString()}`
    }
    const sameSiteAttribute = `; SameSite=${sameSite}`
    const secureAttribute = secure ? '; Secure' : ''
    document.cookie = `${name}=${value || ''}${expires}; path=/${sameSiteAttribute}${secureAttribute}`
}

export function eraseCookie(name: string): void {
    document.cookie = `${name}=; Max-Age=-99999999; path=/; SameSite=Lax`
}

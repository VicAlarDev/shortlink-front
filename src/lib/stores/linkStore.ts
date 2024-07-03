import { writable } from 'svelte/store'

export const linkData = writable<Link[]>([])

export type Link = {
    id: string
    status: 'Expired' | 'Active'
    originalUrl: string
    shortCode: string
    createdAt: string
    updatedAt: string
    expiresAt: string
}

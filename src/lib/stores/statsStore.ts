import { writable } from 'svelte/store'

export const statsStore = writable<{
    totalClicks: number
    stats: Array<{ country: string; count: number; lastClickedAt: string }>
} | null>(null)

import { writable } from 'svelte/store'
import type { UserLinksStatsResponse } from '$lib/utils'

export const userLinksStatsStore = writable<UserLinksStatsResponse | null>(null)

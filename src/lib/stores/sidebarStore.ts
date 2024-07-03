import { writable } from 'svelte/store'

export const isSidebarMinimized = writable(false)

export const toggleSidebar = () => {
    isSidebarMinimized.update((value) => !value)
}

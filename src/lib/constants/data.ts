import { Home, Link, ChartBar, type IconSource } from 'svelte-hero-icons'

export type NavItem = {
    name: string
    href: string
    icon: IconSource
}

const navItems: NavItem[] = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: Home,
    },
    {
        name: 'Links',
        href: '/links',
        icon: 'link',
    },
    {
        name: 'Stats',
        href: '/stats',
        icon: 'stats',
    },
]

export { navItems }

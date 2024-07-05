<script lang="ts">
    import { _ } from 'svelte-i18n'
    import ThemeSwitcher from './ThemeSwitcher.svelte'
    import Separator from '../ui/separator/separator.svelte'
    import { page } from '$app/stores'
    import { eraseCookie } from '../../helpers/cookie'
    import { goto } from '$app/navigation'
    import { Icon, ArrowLeftStartOnRectangle } from 'svelte-hero-icons'

    let currentPath = ''
    let isMenuOpen = false

    $: currentPath = $page.url.pathname

    function toggleMenu() {
        isMenuOpen = !isMenuOpen
    }

    function handleLogout() {
        eraseCookie('shortlink-token')
        goto('/login')
    }
</script>

<div class="flex items-center justify-between p-8">
    <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">
        Short<span class="text-secondary-foreground">{' '}Link</span>
    </p>
    <div class="flex-col items-center hidden gap-2 md:flex">
        <nav class="text-xl flex items-center gap-4 font-['Poppins']">
            <a
                href="/dashboard"
                class="text-lg font-medium transition-colors text-secondary-foreground hover:text-primary"
                class:active={currentPath === '/dashboard'}>{$_('home')}</a
            >
            <a
                href="/dashboard/links"
                class="text-lg font-medium hover:text-primary"
                class:active={currentPath === '/dashboard/links'}>Links</a
            >
        </nav>
        <Separator class="w-72" />
    </div>
    <div class="hidden md:flex md:items-center md:gap-4">
        <div class="flex items-center gap-2 cursor-pointer hover:text-red-500">
            <Icon
                src={ArrowLeftStartOnRectangle}
                alt="logout"
                class="w-6 h-6"
            />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="text-lg font-medium" on:click={handleLogout}>
                {$_('logout')}
            </div>
        </div>
        <ThemeSwitcher />
    </div>
    <button class="md:hidden focus:outline-none" on:click={toggleMenu}>
        <svg
            class="w-6 h-6 text-secondary-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
            ></path>
        </svg>
    </button>
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={`fixed inset-0 bg-black bg-opacity-50 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}
    on:click={toggleMenu}
>
    <div class="w-64 h-full p-8 bg-background" on:click|stopPropagation>
        <div class="flex items-center justify-between mb-8">
            <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">
                Short<span class="text-secondary-foreground">{' '}Link</span>
            </p>
            <button class="focus:outline-none" on:click={toggleMenu}>
                <svg
                    class="w-6 h-6 text-secondary-foreground"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                </svg>
            </button>
        </div>
        <nav class="text-xl flex flex-col gap-4 font-['Poppins']">
            <a
                href="/dashboard"
                class="text-lg font-medium transition-colors text-secondary-foreground hover:text-primary"
                class:active={currentPath === '/dashboard'}>{$_('home')}</a
            >
            <a
                href="/dashboard/links"
                class="text-lg font-medium hover:text-primary"
                class:active={currentPath === '/dashboard/links'}>Links</a
            >
        </nav>
        <Separator class="my-4" />

        <div class="flex flex-col justify-start gap-4 cursor-pointer">
            <div class="flex items-center gap-2 hover:text-red-500">
                <Icon
                    src={ArrowLeftStartOnRectangle}
                    alt="logout"
                    class="w-6 h-6"
                />
                <div class="text-lg font-medium" on:click={handleLogout}>
                    {$_('logout')}
                </div>
            </div>
            <ThemeSwitcher />
        </div>
    </div>
</div>

<style>
    .active {
        @apply text-primary;
    }
</style>

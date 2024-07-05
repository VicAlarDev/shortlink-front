<script lang="ts">
    import { _ } from 'svelte-i18n'
    import ThemeSwitcher from './ThemeSwitcher.svelte'
    import Separator from '../ui/separator/separator.svelte'
    import { page } from '$app/stores'

    let currentPath = ''

    $: currentPath = $page.url.pathname
</script>

<div class="flex justify-between p-8">
    <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">
        Short<span class="text-white">{' '}Link</span>
    </p>
    <div class="flex flex-col items-center gap-2">
        <nav class="text-xl flex items-center gap-4 font-['Poppins']">
            <a
                href="/dashboard"
                class="text-lg font-medium transition-colors text-primary-foreground hover:text-primary"
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
    <ThemeSwitcher />
</div>

<style>
    .active {
        @apply text-primary;
    }
</style>

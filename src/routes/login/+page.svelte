<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores'
    import Form from '$lib/components/login/Form.svelte'

    let titleP: string

    $: {
        const { title } = $page.data
        titleP = title
    }
</script>

<svelte:head>
    <title>{$_('title_login')} - Shortlink</title>
    <meta name="description" content={$_('content_login')} />
</svelte:head>

<main class="flex flex-col min-h-screen">
    <div class="flex justify-between p-8">
        <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">
            Short<span class="text-white">{' '}Link</span>
        </p>
    </div>
    <div class="flex flex-col items-center justify-center flex-grow">
        <Form />
    </div>
</main>

<style>
    main {
        background-color: hsla(264, 13%, 7%, 1);
        background-image: radial-gradient(
                circle at 0% 55%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 20%
            ),
            radial-gradient(
                circle at 100% 20%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 19%
            );
    }
</style>

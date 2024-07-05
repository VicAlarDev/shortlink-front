<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores'
    import LinksTable from '$lib/components/dashboard/links/LinksTable.svelte'

    let titleP: string

    $: {
        const { title } = $page.data
        titleP = title
    }
</script>

<svelte:head>
    <title>{titleP}</title>
    <meta name="description" content={$_('content_links')} />
</svelte:head>

<div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold font-['Josefin_Sans']">Links</h1>
</div>

<LinksTable />

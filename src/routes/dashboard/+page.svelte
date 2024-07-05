<script lang="ts">
    import { _ } from 'svelte-i18n'
    import {
        Link,
        UserGroup,
        GlobeAlt,
        CursorArrowRays,
    } from 'svelte-hero-icons'
    import CardDashboard from '$lib/components/dashboard/CardDashboard.svelte'
    import CountryStats from '$lib/components/dashboard/CountryStats.svelte'
    import { type UserLinksStatsResponse } from '$lib/utils'
    import { page } from '$app/stores'

    let data: UserLinksStatsResponse
    let titleP: string

    $: {
        const { link, title } = $page.data
        if (link) {
            data = link
            titleP = title
        }
    }
</script>

<svelte:head>
    <title>{titleP}</title>
    <meta name="description" content={$_('content_dashboard')} />
</svelte:head>

<div class="flex items-center justify-between">
    <h1 class="text-3xl font-bold font-['Josefin_Sans']">Dashboard</h1>
</div>

<div class="flex flex-col gap-4 mt-8">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardDashboard
            icon={Link}
            title={$_('total_links_created')}
            value={data.totalLinks ?? $_('no_data')}
            description={$_('number_of_links')}
        />
        <CardDashboard
            icon={CursorArrowRays}
            title={$_('total_clicks')}
            value={data.totalClicks ?? $_('no_data')}
            description="Clicks"
        />
        <CardDashboard
            icon={UserGroup}
            title={$_('unique_visitors')}
            value={data.uniqueVisitors ?? $_('no_data')}
            description={$_('number_of_visits')}
        />
        <CardDashboard
            icon={GlobeAlt}
            title={$_('total_of_countries')}
            value={data.totalCountries ?? 'No data'}
        />
    </div>
</div>

<CountryStats {data} />

<style>
    :global(.map) {
        height: 100%;
        width: 100%;
    }
</style>

<script lang="ts">
    import { page } from '$app/stores'
    import { CursorArrowRipple, User, GlobeAlt, Clock } from 'svelte-hero-icons'
    import CardDashboard from '$lib/components/dashboard/CardDashboard.svelte'
    import CountryStatsTable from '$lib/components/dashboard/links/CountryStatsTable.svelte'
    import RecentClicks from '$lib/components/dashboard/RecentClicks.svelte'
    import { type LinkResponse } from '$lib/utils'

    let data: LinkResponse
    let title: string
    let metaDescription: string

    $: {
        const { link } = $page.data
        if (link) {
            data = link
            title = $page.data.title
            metaDescription = $page.data.metaDescription
        }
    }
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={metaDescription} />
</svelte:head>

<div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold font-['Josefin_Sans']">
        Stats for your Link: <span class="font-['Poppins'] text-xl text-primary"
            >{data.shortCode}</span
        >
    </h2>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-8">
    <CardDashboard
        title="Total Clicks"
        icon={CursorArrowRipple}
        value={data.totalClicks ?? 'No data'}
    />

    <CardDashboard
        title="Unique Visitors"
        icon={User}
        value={data.uniqueClicks ?? 'No data'}
    />

    <CardDashboard
        title="Top Country"
        icon={GlobeAlt}
        value={data.stats.length > 0
            ? `${data.stats[0].country}: ${data.stats[0].count}`
            : 'No data'}
    />

    <CardDashboard
        title="Link Status"
        icon={Clock}
        value={data?.status ?? 'No data'}
        cs={data?.status === 'Active' ? 'text-green-500' : 'text-red-500'}
    />
</div>

<CountryStatsTable stats={data.stats} />

<div class="mt-8">
    <RecentClicks clicks={data.clicks} />
</div>

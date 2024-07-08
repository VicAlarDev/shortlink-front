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
    let isLoading = true

    $: {
        const { link, title } = $page.data
        if (link) {
            data = link
            titleP = title
            isLoading = false
        }
    }
</script>

<svelte:head>
    <title>{titleP}</title>
    <meta name="description" content={$_('content_dashboard')} />
</svelte:head>

{#if isLoading}
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
{:else}
    <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold font-['Josefin_Sans']">Dashboard</h1>
    </div>

    <div class="flex flex-col gap-4 mt-8">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
{/if}

<style>
    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(
            0,
            0,
            0,
            0.5
        ); 
        z-index: 1000; 
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    :global(.map) {
        height: 100%;
        width: 100%;
    }
</style>

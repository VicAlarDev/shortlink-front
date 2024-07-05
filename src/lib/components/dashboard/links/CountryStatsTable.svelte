<script lang="ts">
    import { _ } from 'svelte-i18n'
    import * as Table from '$lib/components/ui/table/index.js'
    import * as Card from '$lib/components/ui/card/index.js'
    import { GlobeAlt, Icon } from 'svelte-hero-icons'
    import CountryStatsChart from './CountryStatsChart.svelte'
    import { getTopCountries, type Stat } from '$lib/utils'
    import { formatDate } from '$lib/utils'

    export let stats: Stat[] = []
</script>

<Card.Root>
    <Card.Header
        class="flex flex-row items-center justify-between gap-2 pb-2 space-y-0"
    >
        <Card.Title class="font-['Josefin_Sans'] font-bold text-lg"
            >{$_('country_stats')}</Card.Title
        >
    </Card.Header>
    <Card.Content
        class="font-['Poppins'] font-medium grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
        <Table.Root>
            <Table.Caption>{$_('statistics_by_country')}</Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head>{$_('country')}</Table.Head>
                    <Table.Head>{$_('total_clicks')}</Table.Head>
                    <Table.Head>{$_('last_clicked_at')}</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#if stats.length === 0}
                    <Table.Row>
                        <Table.Cell colspan={3} class="text-center">
                            {$_('currently_no_data')}
                        </Table.Cell>
                    </Table.Row>
                {:else}
                    {#each getTopCountries(stats, 10) as stat (stat.country)}
                        <Table.Row>
                            <Table.Cell class="font-medium">
                                <div class="flex items-center gap-2">
                                    {#if stat.country === 'Unknown' || stat.country === 'Others'}
                                        <Icon src={GlobeAlt} class="w-6 h-6" />
                                        {stat.country}
                                    {:else}
                                        <img
                                            src={`https://flagsapi.com/${stat.country}/shiny/64.png`}
                                            alt={stat.country}
                                            class="w-6 h-6"
                                        />
                                        {stat.country}
                                    {/if}
                                </div>
                            </Table.Cell>
                            <Table.Cell>{stat.count}</Table.Cell>
                            <Table.Cell
                                >{stat.lastClickedAt
                                    ? formatDate(stat.lastClickedAt)
                                    : 'N/A'}</Table.Cell
                            >
                        </Table.Row>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>

        <CountryStatsChart {stats} />
    </Card.Content>
</Card.Root>

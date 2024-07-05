<script lang="ts">
    import { _ } from 'svelte-i18n'
    import * as Card from '$lib/components/ui/card'
    import { formatDistanceToNow } from 'date-fns'
    import { GlobeAlt, Icon } from 'svelte-hero-icons'

    export let clicks: {
        country: string | null
        referer: string | null
        clickedAt: string
        link: string
    }[] = []
    export let link: string = ''
    export let limit: number = 5
    export let showFrom: boolean = true

    const getFlagImageUrl = (countryCode: string) => {
        return `https://flagsapi.com/${countryCode}/shiny/64.png`
    }

    const clicksToShow = [...clicks]
        .sort(
            (a, b) =>
                new Date(b.clickedAt).getTime() -
                new Date(a.clickedAt).getTime()
        )
        .slice(0, limit)
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>{$_('recent_clicks')}</Card.Title>
        <Card.Description>{$_('list_of_recent_clicks')}</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-8">
        {#if clicksToShow.length === 0}
            <div class="text-center text-muted-foreground">
                {$_('currently_no_data')}
            </div>
        {:else}
            {#each clicksToShow as click}
                <div class="flex items-center gap-4">
                    {#if click.country === 'Unknown' || click.country === null}
                        <Icon
                            src={GlobeAlt}
                            class="w-6 h-6 mr-2 text-muted-foreground"
                        />
                    {:else}
                        <img
                            src={getFlagImageUrl(click.country ?? '')}
                            alt="Flag"
                            class="w-6 h-6 mr-2"
                        />
                    {/if}

                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">
                            {click.country || $_('unknown')}
                        </p>
                        {#if showFrom}
                            <p class="text-sm text-muted-foreground">
                                {$_('from')}: {click.referer || $_('direct')}
                            </p>
                        {:else}
                            <p class="text-sm text-muted-foreground">
                                {!link ? click.link : $_('unknown')}
                            </p>
                        {/if}
                    </div>
                    <div class="ml-auto font-medium">
                        {formatDistanceToNow(new Date(click.clickedAt), {
                            addSuffix: true,
                        })}
                    </div>
                </div>
            {/each}
        {/if}
    </Card.Content>
</Card.Root>

<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { Icon, type IconSource } from 'svelte-hero-icons'
    import * as Card from '$lib/components/ui/card'
    import { cn } from '$lib/utils'

    export let icon: IconSource
    export let title: string
    export let value: number | string
    export let description: string | undefined = undefined
    export let cs: string | undefined = undefined
</script>

<Card.Root>
    <Card.Header
        class="flex flex-row items-center justify-between gap-2 pb-2 space-y-0"
    >
        <Card.Title class={cn('font-["Josefin_Sans"] font-bold text-lg')}
            >{title}</Card.Title
        >
        <Icon src={icon} class="w-6 h-6 text-muted-foreground" />
    </Card.Header>
    <Card.Content class="font-['Poppins'] font-medium">
        {#if value !== undefined && value !== null && value !== ''}
            <div class={cn('text-2xl font-bold', cs)}>{value}</div>
            <p class="text-xs font-['Poppins'] text-muted-foreground mt">
                {#if description}
                    {description}
                {/if}
            </p>
        {:else}
            <div class="text-2xl font-bold">{$_('no_data')}</div>
        {/if}
    </Card.Content>
</Card.Root>

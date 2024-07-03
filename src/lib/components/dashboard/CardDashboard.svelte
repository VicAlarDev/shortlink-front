<script lang="ts">
    import { Icon, type IconSource } from 'svelte-hero-icons'
    import * as Card from '$lib/components/ui/card'

    export let icon: IconSource
    export let title: string
    export let value: number
    export let descrption: string
</script>

<Card.Root>
    <Card.Header
        class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
        <Card.Title class="font-['Josefin_Sans'] font-bold text-lg"
            >{title}</Card.Title
        >
        <Icon src={icon} class="h-8 w-8 text-muted-foreground" />
    </Card.Header>
    <Card.Content class="font-['Poppins'] font-medium">
        <div class="text-2xl font-bold">{value}</div>
        <p class="text-xs font-['Poppins'] text-muted-foreground">
            {descrption}
        </p>
    </Card.Content>
</Card.Root>

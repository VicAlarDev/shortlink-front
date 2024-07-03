<script lang="ts">
    import * as Tooltip from '$lib/components/ui/tooltip'

    export let href: string
    export let target: string
    export let rel: string
    export let children: string
    export let className: string
</script>

<Tooltip.Root>
    <Tooltip.Trigger
        ><a {href} {target} {rel} class={className}>{children}</a
        ></Tooltip.Trigger
    >
    <Tooltip.Content>
        <p>{href}</p>
    </Tooltip.Content>
</Tooltip.Root>

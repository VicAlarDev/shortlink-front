<script lang="ts">
    import { fade, fly } from 'svelte/transition'
    import type { HTMLAttributes } from 'svelte/elements'
    import { cn } from '$lib/utils.js'

    type $$Props = HTMLAttributes<HTMLTableRowElement> & {
        'data-state'?: unknown
    }

    let className: $$Props['class'] = undefined
    export { className as class }
</script>

<tr
    in:fly={{ y: 20, duration: 300 }}
    out:fade={{ duration: 400 }}
    class={cn(
        'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
    )}
    {...$$restProps}
    on:click
    on:keydown
>
    <slot />
</tr>

<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { Sun, Moon, Icon } from 'svelte-hero-icons'

    import { toggleMode } from 'mode-watcher'
    import { Button } from '$lib/components/ui/button/index.js'
</script>

<Button on:click={toggleMode} variant="outline" size="icon">
    <Icon
        src={Sun}
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Icon
        src={Moon}
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only"> {$_('toggle_theme')} </span>
</Button>

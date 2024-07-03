<script>
    import '../app.css'
    import { ModeWatcher } from 'mode-watcher'
    import { Toaster } from 'svelte-french-toast'

    import { browser } from '$app/environment'
    import '$lib/i18n'
    import { locale, waitLocale } from 'svelte-i18n'

    export const load = async () => {
        if (browser) {
            locale.set(window.navigator.language)
        }
        await waitLocale()
    }
</script>

<ModeWatcher />
<Toaster />
<slot />

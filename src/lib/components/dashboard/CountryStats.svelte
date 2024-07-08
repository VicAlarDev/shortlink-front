<script lang="ts">
    import { _ } from 'svelte-i18n'
    import Map from '$lib/components/dashboard/Map.svelte'
    import RecentClicks from '$lib/components/dashboard/RecentClicks.svelte'
    import { type UserLinksStatsResponse } from '$lib/utils'

    export let data: UserLinksStatsResponse

    // Extraer clics de todos los enlaces acortados
    const clicks = data.links
        ? data.links.flatMap((shortUrl) =>
              shortUrl.clicks.map((click) => ({
                  country: click.country,
                  referer: click.referer ?? $_('direct'),
                  clickedAt: click.clickedAt,
                  link: shortUrl.shortCode,
              }))
          )
        : []
</script>

<div class="flex flex-col justify-between gap-4 mt-8 xl:flex-row">
    <div class="w-full xl:w-3/4">
        <Map {data} />
    </div>

    <div class="w-full xl:w-1/4">
        <RecentClicks {clicks} showFrom={false} limit={10} />
    </div>
</div>

<style>
</style>

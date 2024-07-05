<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import * as Card from '$lib/components/ui/card/index.js'
    import { MapLibre, Marker, Popup } from 'svelte-maplibre'
    import { type UserLinksStatsResponse } from '$lib/utils'

    export let data: UserLinksStatsResponse

    let markers: Array<{
        lngLat: { lat: number; lng: number }
        label: string
        name: string
        value: number
    }> = []

    onMount(() => {
        markers = data.links
            .flatMap((link) => link.stats)
            .filter(
                (stat) =>
                    stat.country !== 'Unknown' &&
                    stat.latitude !== null &&
                    stat.longitude !== null
            )
            .map((stat) => ({
                lngLat: {
                    lat: stat.latitude as number,
                    lng: stat.longitude as number,
                },
                label: stat.country,
                name: stat.country,
                value: stat.count,
            }))
    })
</script>

<Card.Root class="xl:col-span-2">
    <Card.Header class="flex flex-row items-center">
        <div class="grid gap-2">
            <Card.Title>{$_('countries_accessed')}</Card.Title>
            <Card.Description>
                {$_('list_of_countries')}
            </Card.Description>
        </div>
    </Card.Header>
    <Card.Content>
        <div class="map-container">
            <MapLibre
                style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                class="map"
                standardControls
                zoom={1}
                center={[-20, 0]}
                interactive={true}
            >
                {#each markers as { lngLat, label, name, value }, index (index)}
                    <Marker
                        {lngLat}
                        class="grid w-8 h-8 text-black bg-red-300 border border-gray-200 rounded-full shadow-2xl place-items-center focus:outline-2 focus:outline-black"
                    >
                        <span>{label}</span>

                        <Popup openOn="hover" offset={[0, -10]}>
                            <div
                                class="flex flex-col text-sm font-bold text-slate-950"
                            >
                                <p>{name}</p>
                                <p>Clicks: {value}</p>
                            </div>
                        </Popup>
                    </Marker>
                {/each}
            </MapLibre>
        </div>
    </Card.Content>
</Card.Root>

<style>
    .map-container {
        position: relative;
        height: 500px;
        width: 100%;
    }

    :global(.map) {
        height: 100%;
        width: 100%;
    }
</style>

<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js'
    import { MapLibre, Marker, Popup } from 'svelte-maplibre'

    interface MarkerData {
        lngLat: { lat: number; lng: number }
        label: string
        name: string
        value: number
    }

    const markers: MarkerData[] = [
        {
            lngLat: { lat: 54.526, lng: -105.2551 },
            label: 'NA',
            name: 'North America',
            value: 0.82,
        },
        {
            lngLat: { lat: -14.235, lng: -51.9253 },
            label: 'SA',
            name: 'South America',
            value: 2.04,
        },
        {
            lngLat: { lat: 34.0479, lng: 100.6197 },
            label: 'AS',
            name: 'Asia',
            value: 1.78,
        },
        {
            lngLat: { lat: 54.526, lng: 15.2551 },
            label: 'EU',
            name: 'Europe',
            value: 0.4,
        },
        {
            lngLat: { lat: -8.7832, lng: 34.5085 },
            label: 'AF',
            name: 'Africa',
            value: 2.58,
        },
        {
            lngLat: { lat: -25.2744, lng: 133.7751 },
            label: 'AU',
            name: 'Australia',
            value: 1.3,
        },
    ]
</script>

<Card.Root class="xl:col-span-2">
    <Card.Header class="flex flex-row items-center">
        <div class="grid gap-2">
            <Card.Title>Countries Accessed</Card.Title>
            <Card.Description>
                List of countries accessed by users in the last 30 days.
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
                {#each markers as { lngLat, label, name, value } (label)}
                    <Marker
                        {lngLat}
                        class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 bg-red-300 text-black shadow-2xl focus:outline-2 focus:outline-black"
                    >
                        <span>{label}</span>

                        <Popup openOn="hover" offset={[0, -10]}>
                            <div
                                class="text-sm font-bold text-slate-950 flex flex-col"
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

<script lang="ts">
    import Map from '$lib/components/dashboard/Map.svelte'
    import RecentClicks from '$lib/components/dashboard/RecentClicks.svelte'
</script>

<div class="mt-8 flex flex-col lg:flex-row justify-between gap-4">
    <div class="w-full lg:w-3/4">
        <Map />
    </div>

    <div class="w-full lg:w-1/4">
        <RecentClicks />
    </div>
</div>

<style>
</style>

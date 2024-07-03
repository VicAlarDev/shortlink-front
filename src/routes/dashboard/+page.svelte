<script lang="ts">
    import {
        Link,
        UserGroup,
        GlobeAlt,
        CursorArrowRays,
    } from 'svelte-hero-icons'
    import CardDashboard from '$lib/components/dashboard/CardDashboard.svelte'
    import DateRangerPicker from '$lib/components/dashboard/DateRangerPicker.svelte'
    import CountryStats from '$lib/components/dashboard/CountryStats.svelte'
</script>

<div class="flex justify-between items-center">
    <h1 class="text-3xl font-bold font-['Josefin_Sans']">Dashboard</h1>

    <DateRangerPicker />
</div>

<div class="flex flex-col gap-4 mt-8">
    <div class="grid grid-cols-4 gap-4">
        <CardDashboard
            icon={Link}
            title="Total Links Created"
            value={100}
            descrption="Links created"
        />
        <CardDashboard
            icon={CursorArrowRays}
            title="Total Clicks"
            value={100.0}
            descrption="Clicks"
        />
        <CardDashboard
            icon={UserGroup}
            title="Unique Visitors"
            value={100}
            descrption="Visits"
        />
        <CardDashboard
            icon={GlobeAlt}
            title="Total of countries"
            value={100}
            descrption="Countries accessed"
        />
    </div>
</div>

<CountryStats />

<script lang="ts">
    import HeaderDashboard from '$lib/components/dashboard/HeaderDashboard.svelte'
</script>

<div class="dark:bg-background h-screen">
    <HeaderDashboard />

    <div class="flex h-screen overflow-y-hidden">
        <div class="flex-1 overflow-y-auto">
            <div class="mx-auto max-w-full px-4 py-6 sm:px-6 md:px-8">
                <main>
                    <slot />
                </main>
            </div>
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>

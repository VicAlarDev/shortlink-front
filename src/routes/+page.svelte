<script lang="ts">
    import { _ } from 'svelte-i18n'
    import Header from '$lib/components/Header.svelte'
    import Main from '$lib/components/Main.svelte'
    import Card from '$lib/components/Card.svelte'
    import { onMount } from 'svelte'
    import { PaperClip, CursorArrowRays, UserGroup } from 'svelte-hero-icons'
    import { BACKEND_URL } from '$lib/constants/link'

    let links = 0
    let users = 0
    let clicks = 0
    let isLoading = true

    async function getLinks() {
        try {
            const res = await fetch(`${BACKEND_URL}/api/all/count`)
            const data = await res.json()
            links = data.links
            users = data.users
            clicks = data.clicks
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            isLoading = false
        }
    }

    onMount(() => {
        getLinks()
    })
</script>

<svelte:head>
    <title>Shortlink</title>
</svelte:head>

<main class="flex flex-col items-center justify-between min-h-dvh">
    {#if isLoading}
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    {:else}
        <div class="flex-grow w-full">
            <Header />
            <Main />
            <div
                class="flex flex-col items-center justify-center w-full gap-8 mt-20 lg:flex-row"
            >
                <Card
                    title={`+${links}`}
                    subtitle={$_('subtitle_links')}
                    src={PaperClip}
                    iconAlt="clip"
                />
                <Card
                    title={`+${clicks}`}
                    subtitle={$_('subtitle_clicks')}
                    src={CursorArrowRays}
                    iconAlt="clip"
                />
                <Card
                    title={`+${users}`}
                    subtitle={$_('subtitle_users')}
                    src={UserGroup}
                    iconAlt="clip"
                />
            </div>
        </div>

        <h3
            class="text-md text-center font-medium mt-4 lg:mt-0 lg:mb-4 text-[#F1EAFE] font-['Josefin_Sans']"
        >
            {$_('made_with')}
            <a
                href="https://github.com/VicAlarDev"
                target="_blank"
                class="text-[#F1EAFE] font-['Poppins']">Victor Alarcon</a
            >
        </h3>
    {/if}
</main>

<style>
    main {
        background-color: hsla(264, 13%, 7%, 1);
        background-image: radial-gradient(
                circle at 0% 55%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 20%
            ),
            radial-gradient(
                circle at 100% 20%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 19%
            );
    }

    .spinner-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(
            0,
            0,
            0,
            0.5
        );
        z-index: 1000; 
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

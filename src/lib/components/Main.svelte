<script lang="ts">
    import { _ } from 'svelte-i18n'
    import Modal from './modal/Modal.svelte'
    import { onMount } from 'svelte'
    import { getCookie, setCookie } from '../helpers/cookie'
    import { BACKEND_URL } from '$lib/constants/link'

    let open = false
    let shortCode: string = ''
    let isLoading = false
    let openedFromCookie = false
    let isValidUrl = true

    async function shorten(event: SubmitEvent): Promise<void> {
        event.preventDefault()
        const target = event.target as HTMLFormElement
        const input = target[0] as HTMLInputElement

        if (!input.checkValidity()) {
            isValidUrl = false
            return
        } else {
            isValidUrl = true
        }

        const storedShortCode = getCookie('shortCode')
        if (storedShortCode) {
            shortCode = storedShortCode
            open = true
            openedFromCookie = true
            return
        }

        open = true
        isLoading = true
        try {
            const response = await fetch(`${BACKEND_URL}/api/shorten/random`, {
                method: 'POST',
                body: JSON.stringify({ originalUrl: input.value }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.ok) {
                const data = await response.json()
                shortCode = data.shortCode
                setCookie('shortCode', shortCode, 1, 'Lax', true)
                openedFromCookie = false
            } else {
                console.error('Error shortening URL:', response)
            }
        } catch (error) {
            console.error('Error:', error)
        } finally {
            isLoading = false
        }
    }

    function closeDialog() {
        open = false
    }

    onMount(() => {
        const storedShortCode = getCookie('shortCode')
        if (storedShortCode) {
            shortCode = storedShortCode
            open = true
            openedFromCookie = true
        }
    })
</script>

<div class="flex flex-col items-center justify-center p-8 text-center">
    <p class="text-6xl font-medium text-[#F1EAFE] font-['Josefin_Sans']">
        {$_('title_shorten_urls')}
    </p>
    <p class="text-6xl font-medium text-[#F1EAFE] font-['Josefin_Sans']">
        {$_('subtitle_fast_easy')}
    </p>
    <p class="text-xl mt-8 text-[#F1EAFE] font-['Poppins']">
        {$_('instruction_insert_link')}
    </p>
</div>

<div
    class="pl-8 pr-2 py-2 bg-[#120E1E] rounded-full border-[#3D354B] border-2 mt-8 lg:w-6/12 flex mx-auto md:flex-col items-center md:8/12 w-10/12"
>
    <form on:submit={shorten} class="flex flex-row items-center w-full">
        <input
            type="url"
            placeholder={$_('placeholder_paste_link')}
            class="w-full text-[#B7AECA] text-xl font-['Poppins'] bg-transparent border-none outline-none"
            pattern="https?://.+"
            required
        />
        <button
            class="w-fit md:px-8 md:py-4 px-4 py-2 text-[#F1EAFE] text-2xl font-['Josefin_Sans'] button border-none outline-none rounded-full button"
            type="submit">{$_('button_shorten')}</button
        >
    </form>
    {#if !isValidUrl}
        <p class="mt-2 text-sm text-red-500">{$_('invalid_url_message')}</p>
    {/if}
</div>

<Modal
    {open}
    {isLoading}
    {openedFromCookie}
    openedFromAction={false}
    on:close={closeDialog}
    url={shortCode}
/>

<style>
    .button {
        background: linear-gradient(
            135deg,
            rgba(104, 67, 181, 1) 0%,
            rgba(65, 38, 119, 1) 100%
        );
    }
</style>

<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores'
    import { linkData } from '../../../stores/linkStore'
    import { Icon, Plus } from 'svelte-hero-icons'
    import { Button, buttonVariants } from '$lib/components/ui/button/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import { Input } from '$lib/components/ui/input/index.js'
    import { Label } from '$lib/components/ui/label/index.js'
    import toast from 'svelte-french-toast'

    let shortCode = ''
    let originalUrl = ''
    let token = ''
    let open = false

    $: {
        const { user } = $page.data
        token = user?.token || ''
    }

    const handleSubmit = async () => {
        const promise = fetch('http://localhost:3000/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ shortCode, originalUrl }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to create short link')
                }
                return response.json()
            })
            .then((data) => {
                linkData.update((currentData) => [
                    ...currentData,
                    { ...data, status: 'Active' },
                ])
                open = false
                return data
            })

        toast.promise(
            promise,
            {
                loading: $_('creating_short_link'),
                success: $_('success_creating_short_link'),
                error: $_('failed_to_create_short_link'),
            },
            {
                style: 'border-radius: 25px; background: #333; color: #fff;',
                position: 'bottom-right',
            }
        )

        try {
            await promise
        } catch (error) {
            console.error('Error:', error)
        }
    }
</script>

<Dialog.Root bind:open>
    <Dialog.Trigger
        class={buttonVariants({ variant: 'default' })}
        on:click={() => (open = true)}
    >
        <Icon src={Plus} class="w-4 h-4" />
        <span class="ml-2 font-['Poppins']">{$_('create_new_link')}</span>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[475px]">
        <Dialog.Header class="font-['Poppins']">
            <Dialog.Title>{$_('create_new_link')}</Dialog.Title>
            <Dialog.Description>
                {$_('create_a_custom_link')}
            </Dialog.Description>
        </Dialog.Header>
        <div class="grid gap-4 py-4 font-['Poppins']">
            <div class="grid items-center grid-cols-4 gap-4">
                <Label for="shortCode" class="text-right">{$_('custom_segment')}</Label>
                <Input
                    id="shortCode"
                    placeholder={$_('placeholder_custom_segment')}
                    class="col-span-3"
                    bind:value={shortCode}
                />
            </div>
            <div class="grid items-center grid-cols-4 gap-4">
                <Label for="originalUrl" class="text-right">{$_('original_url')}</Label>
                <Input
                    id="originalUrl"
                    placeholder="https://cheese.com"
                    class="col-span-3"
                    bind:value={originalUrl}
                />
            </div>
        </div>
        <Dialog.Footer>
            <Button type="button" on:click={handleSubmit}>{$_('create')}</Button>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>

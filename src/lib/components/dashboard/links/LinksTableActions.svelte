<script lang="ts">
    import { _ } from 'svelte-i18n'
    import Ellipsis from 'lucide-svelte/icons/ellipsis'
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
    import { Button } from '$lib/components/ui/button'
    import { writable } from 'svelte/store'
    import DeleteAlertDialog from './DeleteAction.svelte'
    import Modal from '$lib/components/modal/Modal.svelte'

    export let id: string
    export let shortCode: string

    const showDeleteDialog = writable(false)
    const showModal = writable(false)
    const qrCodeUrl = writable('')

    const handleDeleteLink = () => {
        showDeleteDialog.set(true)
    }

    const handleGenerateQRCode = async () => {
        qrCodeUrl.set(shortCode)
        showModal.set(true)
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button
            variant="ghost"
            builders={[builder]}
            size="icon"
            class="relative w-8 h-8 p-0"
        >
            <span class="sr-only">{$_('open_menu')}</span>
            <Ellipsis class="w-4 h-4" />
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="cursor-pointer font-['Poppins']">
        <DropdownMenu.Group>
            <DropdownMenu.Label>{$_('actions')}</DropdownMenu.Label>
            <DropdownMenu.Item
                on:click={() => navigator.clipboard.writeText(shortCode)}
            >
                {$_('copy_short_url')}
            </DropdownMenu.Item>
            <DropdownMenu.Item on:click={handleGenerateQRCode}>
                {$_('button_generate_qr')}
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
            <a href={`/dashboard/links/${id}`}>{$_('view_link_stats')}</a>
        </DropdownMenu.Item>
        <DropdownMenu.Item
            class="text-red-500 hover:!bg-red-700 hover:!text-red-50"
            on:click={handleDeleteLink}
        >
            {$_('delete_link')}
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

{#if $showDeleteDialog}
    <DeleteAlertDialog bind:show={$showDeleteDialog} {shortCode} />
{/if}

{#if $showModal}
    <Modal
        open={$showModal}
        url={$qrCodeUrl}
        openedFromAction={true}
        openedFromCookie={false}
        on:close={() => showModal.set(false)}
    />
{/if}

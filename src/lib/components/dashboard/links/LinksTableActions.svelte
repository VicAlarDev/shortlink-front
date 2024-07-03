<script lang="ts">
    import Ellipsis from 'lucide-svelte/icons/ellipsis'
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
    import { Button } from '$lib/components/ui/button'
    import { writable } from 'svelte/store'
    import DeleteAlertDialog from './DeleteAction.svelte' // Importa el componente del AlertDialog

    export let id: string
    export let shortCode: string

    // Estado reactivo para controlar la visibilidad del AlertDialog
    const showDeleteDialog = writable(false)

    const handleDeleteLink = () => {
        showDeleteDialog.set(true)
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
        <Button
            variant="ghost"
            builders={[builder]}
            size="icon"
            class="relative h-8 w-8 p-0"
        >
            <span class="sr-only">Open menu</span>
            <Ellipsis class="h-4 w-4" />
        </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content class="cursor-pointer font-['Poppins']">
        <DropdownMenu.Group>
            <DropdownMenu.Label>Actions</DropdownMenu.Label>
            <DropdownMenu.Item
                on:click={() => navigator.clipboard.writeText(shortCode)}
            >
                Copy short URL
            </DropdownMenu.Item>
            <DropdownMenu.Item>Generate QR Code</DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>View Link Stats</DropdownMenu.Item>
        <DropdownMenu.Item
            class="text-red-500 hover:!bg-red-700 hover:!text-red-50"
            on:click={handleDeleteLink}
        >
            Delete Link
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>

{#if $showDeleteDialog}
    <DeleteAlertDialog bind:show={$showDeleteDialog} {shortCode} />
{/if}

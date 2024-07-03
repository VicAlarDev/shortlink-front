<script lang="ts">
    import { page } from '$app/stores'
    import * as AlertDialog from '$lib/components/ui/alert-dialog'
    import { deleteShortCode, getLastSegment } from '$lib/utils'
    import { createEventDispatcher } from 'svelte'
    import toast from 'svelte-french-toast'
    import { linkData } from '../../../stores/linkStore' // Importa el store

    export let shortCode: string
    export let show: boolean
    let token = ''

    $: {
        const { user } = $page.data
        token = user?.token || ''
    }

    const dispatch = createEventDispatcher()

    const handleCancel = () => {
        show = false
        dispatch('cancel')
    }

    const handleConfirm = async () => {
        const lastSegment = getLastSegment(shortCode)

        const promise = deleteShortCode(lastSegment, token).then((res) => {
            linkData.update((currentData) =>
                currentData.filter((link) => link.shortCode !== shortCode)
            )
            show = false
            dispatch('confirm')
            return res
        })

        toast.promise(
            promise,
            {
                loading: 'Deleting short code...',
                success: 'Successfully deleted short code',
                error: 'Failed to delete short code',
            },
            {
                style: 'border-radius: 25px; background: #333; color: #fff;',
                position: 'bottom-right',
            }
        )

        try {
            await promise
        } catch (error) {
            console.error(error)
        }
    }
</script>

<AlertDialog.Root bind:open={show}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
            <AlertDialog.Description>
                This action cannot be undone. This will permanently delete your
                link and remove the stats of your link from our servers.
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel on:click={handleCancel}
                >Cancel</AlertDialog.Cancel
            >
            <AlertDialog.Action on:click={handleConfirm}
                >Continue</AlertDialog.Action
            >
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>

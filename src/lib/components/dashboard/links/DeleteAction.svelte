<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { page } from '$app/stores'
    import * as AlertDialog from '$lib/components/ui/alert-dialog'
    import { deleteShortCode, getLastSegment } from '$lib/utils'
    import { createEventDispatcher } from 'svelte'
    import toast from 'svelte-french-toast'
    import { linkData } from '../../../stores/linkStore'

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
                loading: $_('deleting_short_code'),
                success: $_('success_deleting_short_code'),
                error: $_('failed_to_delete_short_code'),
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
            <AlertDialog.Title>{$_('are_you_absolutely_sure')}</AlertDialog.Title>
            <AlertDialog.Description>
                {$_('this_action_cannot_be_undone')}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel on:click={handleCancel}
                >{$_('cancel')}</AlertDialog.Cancel
            >
            <AlertDialog.Action on:click={handleConfirm}
                >{$_('continue')}</AlertDialog.Action
            >
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>

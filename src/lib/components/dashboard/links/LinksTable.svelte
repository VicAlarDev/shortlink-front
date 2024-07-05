<script lang="ts">
    import { _ } from 'svelte-i18n'
    import AddNew from './AddNew.svelte'
    import {
        createRender,
        createTable,
        Render,
        Subscribe,
    } from 'svelte-headless-table'
    import {
        addPagination,
        addSortBy,
        addTableFilter,
    } from 'svelte-headless-table/plugins'
    import { page } from '$app/stores'
    import { Icon, ArrowUp } from 'svelte-hero-icons'
    import { linkData, type Link } from '../../../stores/linkStore'
    import * as Table from '$lib/components/ui/table'
    import { Button } from '$lib/components/ui/button'
    import { Input } from '$lib/components/ui/input'
    import { Badge } from '$lib/components/ui/badge'
    import LinksTableActions from './LinksTableActions.svelte'
    import LinkA from './Link.svelte'
    import { formatDate } from '$lib/utils'

    $: {
        const { links } = $page.data
        if (links) {
            linkData.set(
                links.map((link: Link) => ({
                    id: link.id,
                    status: link.status,
                    originalUrl: link.originalUrl,
                    shortCode: link.shortCode,
                    createdAt: link.createdAt,
                    updatedAt: link.updatedAt,
                    expiresAt: link.expiresAt,
                }))
            )
        }
    }

    const table = createTable(linkData, {
        page: addPagination(),
        sort: addSortBy(),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
    })

    const columns = table.createColumns([
        table.column({
            accessor: 'originalUrl',
            header: $_('original_url'),
            cell: ({ value }) => {
                // Truncate the URL if it's too long
                if (value.length > 20) {
                    let truncatedUrl = value.slice(0, 20) + '...'
                    return createRender(LinkA, {
                        href: value,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        children: truncatedUrl,
                        className:
                            'font-["Poppins"] text-ellipsis hover:underline hover:text-blue-500',
                    })
                }
                return value
            },
        }),
        table.column({
            accessor: 'shortCode',
            header: $_('short_url'),
            cell: ({ value }) => {
                return createRender(LinkA, {
                    href: value,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    children: value,
                    className:
                        'font-["Poppins"] text-ellipsis hover:underline hover:text-blue-500',
                })
            },
        }),
        table.column({
            accessor: 'createdAt',
            header: $_('created_at'),
            cell: ({ value }) => formatDate(value),
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: 'expiresAt',
            header: $_('expires_at'),
            cell: ({ value }) => formatDate(value),
            plugins: {
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: 'status',
            header: $_('status'),
            cell: ({ value }) => {
                return createRender(Badge, {
                    variant: value === 'Active' ? 'default' : 'destructive',
                    content: value,
                    class: value === 'Active' ? 'bg-green-800' : 'text-white',
                })
            },
            plugins: {
                sort: {
                    disable: false,
                },
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: ({ id, shortCode }) => ({ id, shortCode }),
            header: '',
            cell: ({ value }) => {
                return createRender(LinksTableActions, value)
            },
        }),
    ])

    const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
        table.createViewModel(columns)

    const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page
    const { filterValue } = pluginStates.filter
</script>

<div class="mt-8">
    <div class="flex items-center justify-between py-4">
        <Input
            class="max-w-sm font-['Poppins']"
            placeholder={$_('search_by_url')}
            type="text"
            bind:value={$filterValue}
        />
        <AddNew />
    </div>

    <div class="border rounded-md">
        <Table.Root {...$tableAttrs}>
            <Table.Header>
                {#each $headerRows as headerRow}
                    <Subscribe rowAttrs={headerRow.attrs()}>
                        <Table.Row>
                            {#each headerRow.cells as cell (cell.id)}
                                <Subscribe
                                    attrs={cell.attrs()}
                                    let:attrs
                                    props={cell.props()}
                                    let:props
                                >
                                    <Table.Head
                                        {...attrs}
                                        class="font-['Josefin_Sans'] !font-semibold"
                                    >
                                        {#if cell.id === 'status'}
                                            <Button
                                                variant="ghost"
                                                on:click={props.sort.toggle}
                                            >
                                                <Render of={cell.render()} />
                                                <Icon
                                                    src={ArrowUp}
                                                    class={'ml-2 h-4 w-4'}
                                                />
                                            </Button>
                                        {:else}
                                            <Render of={cell.render()} />
                                        {/if}
                                    </Table.Head>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Header>
            <Table.Body {...$tableBodyAttrs}>
                {#if $pageRows.length === 0}
                    <tr>
                        <td
                            colspan="6"
                            class="text-center p-4 font-['Poppins'] text-lg text-gray-500"
                        >
                            Currently no data available
                        </td>
                    </tr>
                {:else}
                    {#each $pageRows as row (row.id)}
                        <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                            <Table.Row {...rowAttrs}>
                                {#each row.cells as cell (cell.id)}
                                    <Subscribe attrs={cell.attrs()} let:attrs>
                                        <Table.Cell
                                            {...attrs}
                                            class="font-['Poppins']"
                                        >
                                            {#if cell.id === 'status'}
                                                <div class="ml-[0.8rem]">
                                                    <Render
                                                        of={cell.render()}
                                                    />
                                                </div>
                                            {:else}
                                                <Render of={cell.render()} />
                                            {/if}
                                        </Table.Cell>
                                    </Subscribe>
                                {/each}
                            </Table.Row>
                        </Subscribe>
                    {/each}
                {/if}
            </Table.Body>
        </Table.Root>
    </div>
    <div class="flex items-center justify-end space-x-4 py-4 font-['Poppins']">
        <Button
            variant="outline"
            size="sm"
            on:click={() => ($pageIndex = $pageIndex - 1)}
            disabled={!$hasPreviousPage}>{$_('previous')}</Button
        >
        <Button
            variant="outline"
            size="sm"
            disabled={!$hasNextPage}
            on:click={() => ($pageIndex = $pageIndex + 1)}>{$_('next')}</Button
        >
    </div>
</div>

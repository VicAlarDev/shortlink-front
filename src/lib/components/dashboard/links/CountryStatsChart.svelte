<script lang="ts">
    import { _ } from 'svelte-i18n'
    import { onMount } from 'svelte'
    import {
        Chart,
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
    } from 'chart.js'
    import * as Card from '$lib/components/ui/card/index.js'
    import { getTopCountries, type Stat } from '$lib/utils'

    Chart.register(
        BarController,
        BarElement,
        CategoryScale,
        LinearScale,
        Title,
        Tooltip
    )

    export let stats: Stat[] = []

    let chartCanvas: HTMLCanvasElement

    onMount(() => {
        const maxCountries = 10
        const topStats = getTopCountries(stats, maxCountries)

        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d')
            if (ctx) {
                if (stats.length === 0) {
                    // Clear the canvas
                    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height)
                    // Set the font and alignment for the message
                    ctx.font = '16px sans-serif'
                    ctx.textAlign = 'center'
                    ctx.fillStyle = 'rgba(121, 58, 192, 1)'
                    // Draw the message in the center of the canvas
                    ctx.fillText(
                        $_('data_not_available'),
                        chartCanvas.width / 2,
                        chartCanvas.height / 2
                    )
                } else {
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: topStats.map((stat) => stat.country),
                            datasets: [
                                {
                                    label: $_('total_clicks'),
                                    data: topStats.map((stat) => stat.count),
                                    backgroundColor: 'rgba(121, 58, 192, 0.2)',
                                    borderColor: 'rgba(121, 58, 192, 1)',
                                    borderWidth: 1,
                                },
                            ],
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                title: {
                                    display: true,
                                    text: $_('clicks_by_country'),
                                },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            let label =
                                                context.dataset.label || ''
                                            if (label) {
                                                label += ': '
                                            }
                                            if (context.parsed.y !== null) {
                                                label += context.parsed.y
                                            }
                                            return label
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    beginAtZero: true,
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 90,
                                        minRotation: 0,
                                    },
                                },
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        callback: function (value) {
                                            return Math.floor(Number(value))
                                        },
                                    },
                                },
                            },
                        },
                    })
                }
            }
        }
    })
</script>

<Card.Root>
    <Card.Content class="font-['Poppins'] font-medium" style="height: 100%;">
        <div style="position: relative; height: 400px; width: 100%;">
            <canvas bind:this={chartCanvas} style="height: 100%; width: 100%;"
            ></canvas>
        </div>
    </Card.Content>
</Card.Root>

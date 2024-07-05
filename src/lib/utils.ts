import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cubicOut } from 'svelte/easing'
import type { TransitionConfig } from 'svelte/transition'
import { BACKEND_URL } from '$lib/constants/link'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

type FlyAndScaleParams = {
    y?: number
    x?: number
    start?: number
    duration?: number
}

export const flyAndScale = (
    node: Element,
    params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
    const style = getComputedStyle(node)
    const transform = style.transform === 'none' ? '' : style.transform

    const scaleConversion = (
        valueA: number,
        scaleA: [number, number],
        scaleB: [number, number]
    ) => {
        const [minA, maxA] = scaleA
        const [minB, maxB] = scaleB

        const percentage = (valueA - minA) / (maxA - minA)
        const valueB = percentage * (maxB - minB) + minB

        return valueB
    }

    const styleToString = (
        style: Record<string, number | string | undefined>
    ): string => {
        return Object.keys(style).reduce((str, key) => {
            if (style[key] === undefined) return str
            return str + `${key}:${style[key]};`
        }, '')
    }

    return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
            const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0])
            const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0])
            const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1])

            return styleToString({
                transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                opacity: t,
            })
        },
        easing: cubicOut,
    }
}

export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const deleteShortCode = async (shortCode: string, token: string) => {
    const response = await fetch(`${BACKEND_URL}/api/${shortCode}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to delete short code')
    }

    return response.json()
}

export const getLastSegment = (url: string) => {
    const segments = url.split('/')
    return segments[segments.length - 1]
}

export type Stat = {
    country: string
    count: number
    lastClickedAt: string | null
}

export type LinkResponse = {
    id: string
    shortCode: string
    originalUrl: string
    createdAt: string
    updatedAt: string
    expiresAt: string
    clicks: {
        id: string
        clickedAt: string
        referer: string | null
        country: string | null
        visitorId: string | null
        link: string
    }[]
    totalClicks: number
    uniqueClicks: number
    status: 'Active' | 'Expired'
    stats: {
        country: string
        count: number
        lastClickedAt: string | null
    }[]
}

export interface Click {
    id: string
    clickedAt: string
    referer: string | null
    country: string | null
}

export interface Stats {
    country: string
    count: number
    lastClickedAt: string | null
    latitude: number | null
    longitude: number | null
}

export interface ShortUrl {
    id: string
    shortCode: string
    originalUrl: string
    createdAt: string
    updatedAt: string
    expiresAt: string | null
    clicks: Click[]
    totalClicks: number
    uniqueClicks: number
    status: 'Active' | 'Expired'
    stats: Stats[]
}

export interface UserLinksStatsResponse {
    totalLinks: number
    totalClicks: number
    uniqueVisitors: number
    totalCountries: number
    links: ShortUrl[]
}

export function getTopCountries(stats: Stat[], maxCountries: number): Stat[] {
    const sortedStats = stats.sort((a, b) => b.count - a.count)
    const topCountries = sortedStats.slice(0, maxCountries)
    const otherCountries = sortedStats.slice(maxCountries)
    const otherCount = otherCountries.reduce((acc, curr) => acc + curr.count, 0)

    if (otherCount > 0) {
        topCountries.push({
            country: 'Others',
            count: otherCount,
            lastClickedAt: null,
        })
    }

    return topCountries
}

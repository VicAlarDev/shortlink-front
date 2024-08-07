// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type User = {
    token: string
    userId: string
}

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            user: User | null
        }
        // interface PageData {}
        // interface PageState {}
        // interface Platform {}
    }
}

export {}

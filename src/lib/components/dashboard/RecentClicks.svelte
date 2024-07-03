<script>
    import * as Card from '$lib/components/ui/card'
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>Recent Clicks</Card.Title>
        <Card.Description>List of recent clicks on the URLS.</Card.Description>
    </Card.Header>
    <Card.Content class="grid gap-8">
        <div class="flex items-center gap-4">
            <img
                src="https://flagsapi.com/US/shiny/64.png"
                alt="Flag"
                class="w-6 h-6 mr-2"
            />

            <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">USA</p>
                <p class="text-sm text-muted-foreground">teamomichelito.com</p>
            </div>
            <div class="ml-auto font-medium">3 minutes ago</div>
        </div>
        <div class="flex items-center gap-4">
            <img
                src="https://flagsapi.com/VE/shiny/64.png"
                alt="Flag"
                class="w-6 h-6 mr-2"
            />

            <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">Venezuela</p>
                <p class="text-sm text-muted-foreground">teamomichelito.com</p>
            </div>
            <div class="ml-auto font-medium">10 minutes ago</div>
        </div>
    </Card.Content>
</Card.Root>

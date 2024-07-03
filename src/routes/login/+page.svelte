<script>
    import Form from '$lib/components/login/Form.svelte'
</script>

<main class="min-h-screen flex flex-col">
    <div class="p-8 flex justify-between">
        <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">
            Short<span class="text-white">{' '}Link</span>
        </p>
    </div>
    <div class="flex-grow flex flex-col justify-center items-center">
        <Form />
    </div>
</main>

<style>
    main {
        background-color: hsla(264, 13%, 7%, 1);
        background-image: radial-gradient(
                circle at 0% 55%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 20%
            ),
            radial-gradient(
                circle at 100% 20%,
                hsla(259, 45%, 48%, 1) 0px,
                transparent 19%
            );
    }
</style>

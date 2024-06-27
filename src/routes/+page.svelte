<script lang="ts">
  import { _ } from 'svelte-i18n';
  import Header from '$lib/components/Header.svelte';
  import Main from '$lib/components/Main.svelte';
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';

  let links = 0;
  let users = 0;
  let clicks = 0;

  import { PaperClip, CursorArrowRays, UserGroup } from "svelte-hero-icons";

  async function getLinks() {
    const res = await fetch('http://127.0.0.1:3000/api/all/count');
    const data = await res.json();
    links = data.links;
    users = data.users;
    clicks = data.clicks;
  }

  onMount(() => {
    getLinks();
  });
</script>

<main class="min-h-dvh flex flex-col justify-between items-center">
  <div class="flex-grow w-full">
    <Header />
    <Main />
    <div class="flex items-center justify-center lg:flex-row flex-col w-full mt-20 gap-8">
      <Card title={`+${links}`} subtitle={$_('subtitle_links')} src={PaperClip} iconAlt="clip" />
      <Card title={`+${clicks}`} subtitle={$_('subtitle_clicks')} src={CursorArrowRays} iconAlt="clip" />
      <Card title={`+${users}`} subtitle={$_('subtitle_users')} src={UserGroup} iconAlt="clip" />
    </div>
  </div>

  <h3 class="text-md text-center font-medium mt-4 lg:mt-0 lg:mb-4 text-[#F1EAFE] font-['Josefin_Sans']">
    {$_('made_with')}
    <a href="https://github.com/VicAlarDev" target="_blank" class="text-[#F1EAFE] font-['Poppins']">Victor Alarcon</a>
  </h3>
</main>

<style>
  main {
    background-color: hsla(264,13%,7%,1);
    background-image:
    radial-gradient(circle at 0% 55%, hsla(259,45%,48%,1) 0px, transparent 20%),
    radial-gradient(circle at 100% 20%, hsla(259,45%,48%,1) 0px, transparent 19%);
  }
</style>

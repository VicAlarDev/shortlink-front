<script lang="ts">
  import Header from '$lib/components/Header.svelte'
  import Main from '$lib/components/Main.svelte';
  import Card from '$lib/components/Card.svelte';

  let count = 0;

  import { PaperClip, CursorArrowRays, UserGroup} from "svelte-hero-icons";

  async function getLinks() {
    const res = await fetch('http://127.0.0.1:3000/api/all/count');
    const data = await res.json();
    count = data.count;
    return data.count;
  }

  getLinks();
</script>

<body class="min-h-dvh">
  <Header />
  <Main />

  <div class="flex items-center justify-center w-full mt-20 gap-4">
    <Card title="+{count}" subtitle="Generated Links" src={PaperClip} iconAlt="clip" />
    <Card title="+1M" subtitle="Serving clicks" src={CursorArrowRays} iconAlt="clip" />
    <Card title="+100" subtitle="Unique Visitors" src={UserGroup} iconAlt="clip" />
  </div>
</body>

<style>

  body {
    background-color: hsla(264,13%,7%,1);
    background-image:
    radial-gradient(circle at 0% 55%, hsla(259,45%,48%,1) 0px, transparent 20%),
    radial-gradient(circle at 100% 20%, hsla(259,45%,48%,1) 0px, transparent 19%);
  }

</style>
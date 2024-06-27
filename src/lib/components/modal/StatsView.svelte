<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { statsStore } from '../../stores/statsStore';
  import { Icon, FaceFrown } from "svelte-hero-icons";
  import { get } from 'svelte/store';

  const stats = get(statsStore);
</script>

<div class="text-[#F1EAFE] text-center">
  <h3 class="text-2xl -mt-6 sm:-mt-12 sm:text-3xl md:text-4xl py-2 font-medium leading-6 font-['Josefin_Sans']">{$_('url_stats')} 📈</h3>
  {#if stats && stats.totalClicks > 0}
    <p class="text-xl mt-2">{$_('total_clicks')}: {stats.totalClicks}</p>
    <div class="mt-4">
      {#each stats.stats as stat}
        <div class="flex flex-row items-center justify-center w-fit">
          {#if stat.country === 'Unknown'}
          <p class="mr-2">🌐</p>
          {:else}
          <img src="https://flagsapi.com/{stat.country}/shiny/64.png" alt="Flag" class="w-6 h-6 mr-2" />
          {/if}
          <p class="text-sm sm:text-lg">{stat.country}: {stat.count} clicks ({$_('last_clicked_at')}: {new Date(stat.lastClickedAt).toLocaleString()})</p>
        </div>
      {/each}
    </div>
  {:else}
    <div class="flex flex-col items-center justify-center mt-8">
      <Icon src={FaceFrown} name="face-frown" class="w-[50px] h-[50px] text-[#F1EAFE] cursor-pointer" alt="Face Frown" />
      <p class="mt-4 text-white">{$_('alert_no_stats')}</p>
    </div>
  {/if}
</div>

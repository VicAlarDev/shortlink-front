<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { Icon, Clipboard, ChartBar, QrCode, CheckCircle } from "svelte-hero-icons";
  import { fly, fade } from 'svelte/transition'

  export let url: string;
  export let showAlert: boolean;
  export let openedFromCookie: boolean;
  export let copyToClipboard: () => void;
  export let openQRCodeView: () => void;
  export let openStatsView: () => void;

  function handleCopy() {
    copyToClipboard();
  }
</script>

<h3 class="text-2xl -mt-6 sm:-mt-12 sm:text-3xl md:text-4xl w-fit mx-auto text-center font-medium leading-6 text-[#F1EAFE] font-['Josefin_Sans'] z-0">{$_('url_ready')}</h3>
<div class="pl-8 pr-2 py-2 bg-[#120E1E] rounded-full border-[#3D354B] border-2 mt-8 w-10/12 flex mx-auto flex-col items-center relative">
  <div class="w-full flex flex-row items-center relative">
    <input type="text" placeholder="{$_('placeholder_url')}" class="w-full text-[#B7AECA] text-sm sm:text-xl font-['Poppins'] bg-transparent border-none outline-none" bind:value={url} />
    <button class="w-fit flex items-center px-4 py-2 text-[#F1EAFE] text-xl sm:text-2xl font-['Josefin_Sans'] bg-sky-500 border-none outline-none rounded-full button relative" on:click={handleCopy}>
      {$_('button_copy')}
      <Icon src={Clipboard} name="clipboard" class="w-6 h-6 text-white ml-2" alt="Clipboard" />
    </button>
    {#if showAlert}
      <div
        role="alert"
        class="absolute top-full -right-20 mt-6 bg-[#191428] border-[#BDA1FF] border-l-4 text-[#BDA1FF] p-2 rounded-lg flex items-center transition duration-300 ease-in-out gap-2"
        in:fly={{ y: 20 }} out:fade
      >
        <Icon src={CheckCircle} name="check-circle" class="w-5 h-5 text-[#BDA1FF]" alt="Check Circle" />
        <p class="text-xs font-semibold">{$_('alert_copied')}</p>
      </div>
    {/if}
  </div>
</div>
<div class="flex sm:flex-row flex-col items-center justify-center gap-2 sm:gap-4">
  <div class="bg-transparent rounded-full w-fit mt-4 sm:mt-8 border-white border-2 p-2 px-6">
    <button class="flex items-center gap-2 justify-center" on:click={openQRCodeView}>
      <Icon src={QrCode} name="qr-code" class="w-[30px] h-[30px] text-white" alt="QR Code" />
      <p class="text-[#F1EAFE] text-md sm:text-xl font-['Josefin_Sans'] font-medium">{$_('button_generate_qr')}</p>
    </button>
  </div>
    <button class="mt-4 sm:mt-8 px-4 py-2 text-[#F1EAFE] border-white border-2 rounded-full flex items-center gap-2" on:click={openStatsView}>
      <Icon src={ChartBar} name="chart-bar" class="w-[25px] h-[25px] text-white" alt="Chart Bar" />
      <p class="text-[#F1EAFE] text-md sm:text-xl font-['Josefin_Sans'] font-medium">{$_('see_stats')}</p>
    </button>
</div>
{#if openedFromCookie}
  <div class="alert text-white rounded-lg p-4 mt-8">
    <p class="mb-2 text-center font-['Poppins']">
      {$_('alert_previous_url')}
    </p>
    <p class="text-center font-['Poppins']">
      {$_('alert_free_limit')}
    </p>
  </div>
{/if}

<style>
  .button {
    background: linear-gradient(135deg, rgba(104,67,181,1) 0%, rgba(65,38,119,1) 100%);
  }

  .alert {
    background-color: #F9C5C5;
    border: 1px solid rgb(252, 59, 59);
    color: rgb(151, 0, 0);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
</style>

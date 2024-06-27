<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { XMark, Icon, ArrowLeft } from "svelte-hero-icons";
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Spinner from '../Spinner.svelte';
  import { statsStore } from '../../stores/statsStore';
  import { get } from 'svelte/store';
  import MainView from './MainView.svelte';
  import QRCodeView from './QRCodeView.svelte';
  import StatsView from './StatsView.svelte';
  import QRCode  from 'qrcode';

  export let open: boolean;
  export let isLoading: boolean;
  export let url: string;
  export let openedFromCookie: boolean;
  let showAlert = false;
  let qrCodeUrl = '';
  let qrCodeGenerated = false;
  let currentView = 'main';
  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(url);
      showAlert = true;
      setTimeout(() => {
        showAlert = false;
      }, 3000);
    } catch (err) {
      console.error('Error al copiar al portapapeles: ', err);
    }
  }

  async function generateQRCode() {
    try {
      qrCodeUrl = await QRCode.toDataURL(url);
      qrCodeGenerated = true;
      currentView = 'qr';
    } catch (err) {
      console.error('Error al generar el código QR: ', err);
    }
  }

  function downloadQRCode() {
    const a = document.createElement('a');
    a.href = qrCodeUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function openStatsView() {
    const lastSegmentOfUrl = url.split('/').pop();
    const storedStats = get(statsStore);
    if (storedStats) {
      currentView = 'stats';
      return;
    }

    isLoading = true;
    try {
      const response = await fetch(`http://localhost:3000/api/url/random/${lastSegmentOfUrl}`);
      if (response.ok) {
        const data = await response.json();
        statsStore.set({ totalClicks: data.totalClicks, stats: data.stats });
        currentView = 'stats'
      } else {
        console.error('Error fetching stats:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
    }
  }

  function goBack() {
    currentView = 'main';
  }

  function openQRCodeView() {
    generateQRCode();
  }
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 z-10 bg-[#121015] bg-opacity-75 transition-opacity" on:click={closeModal} in:fade out:fade>
    <div class="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto" on:click|stopPropagation>
      <div class="tuclase rounded-3xl shadow-xl p-4 sm:p-8 transition-all ease-in duration-300 w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl" in:fly={{ y: 200 }}>
        <div class="flex justify-between items-center w-full m-0 p-0 z-50">
          {#if currentView !== 'main'}
            <button on:click={goBack} class="p-2">
              <Icon src={ArrowLeft} name="arrow-left" class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] text-[#F1EAFE] cursor-pointer" alt="Go Back" />
            </button>
          {/if}
          <button on:click={closeModal} class="p-2 ml-auto">
            <Icon src={XMark} name="x-mark" class="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] text-[#F1EAFE] cursor-pointer" alt="Close" />
          </button>
        </div>
        <div class="flex items-center justify-center flex-col w-full min-h-[300px]">
          {#if isLoading}
            <Spinner />
            <p class="mt-4 text-white text-center">{$_('generating_url')}</p>
          {:else}
              {#if currentView === 'main'}
                <MainView 
                  {url} 
                  {showAlert} 
                  {openedFromCookie}
                  {copyToClipboard} 
                  {openQRCodeView} 
                  {openStatsView} 
                />
              {:else if currentView === 'qr'}
                <QRCodeView 
                  {url} 
                  {qrCodeUrl} 
                  {downloadQRCode}
                />
              {:else if currentView === 'stats'}
                <StatsView/>
              {/if}
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}


<style>
  .tuclase {
    background: 
          radial-gradient(circle, rgba(104,67,181,0.5) 0%, rgba(25,20,40,1) 100%),
          rgba(25,20,40,1);
  }
</style>


<script lang="ts">
  import { _ } from 'svelte-i18n'
  import { XMark, Icon, QrCode, Clipboard, CheckCircle, ArrowDownTray } from "svelte-hero-icons";
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import Spinner from './Spinner.svelte';
  import QRCode from 'qrcode';

  export let open: boolean;
  export let isLoading: boolean;
  export let url: string;
  export let openedFromCookie: boolean;
  let showAlert = false;
  let qrCodeUrl = '';
  let qrCodeGenerated = false;
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
</script>

{#if open}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="fixed inset-0 z-10 bg-[#121015] bg-opacity-75 transition-opacity" on:click={closeModal} in:fade out:fade>
    <div class="fixed inset-0 z-20 flex items-center justify-center overflow-y-auto" on:click|stopPropagation>
      <div class="relative tuclase rounded-3xl shadow-xl p-8 transition-all ease-in duration-300 sm:max-w-4xl sm:w-full" in:fly={{ y: 200 }}>
        <div class="absolute top-0 right-0 p-4 flex items-center justify-center" on:click={closeModal}>
          <Icon src={XMark} name="x-mark" class="w-[50px] h-[50px] text-[#F1EAFE] cursor-pointer" alt="X Mark" />
        </div>
        <div class="flex items-center justify-center flex-col">
          {#if isLoading}
            <Spinner />
            <p class="mt-4 text-white">{$_('generating_url')}</p>
          {:else}
            <h3 class="text-4xl py-2 mt-4 font-medium leading-6 text-[#F1EAFE] font-['Josefin_Sans']">{$_('url_ready')}</h3>
            <div class="pl-8 pr-2 py-2 bg-[#120E1E] rounded-full border-[#3D354B] border-2 mt-8 w-10/12 flex mx-auto flex-col items-center relative">
              <div class="w-full flex flex-row items-center relative">
                <input type="text" placeholder="{$_('placeholder_url')}" class="w-full text-[#B7AECA] text-xl font-['Poppins'] bg-transparent border-none outline-none" bind:value={url} />
                <button class="w-fit flex items-center px-4 py-2 text-[#F1EAFE] text-2xl font-['Josefin_Sans'] bg-sky-500 border-none outline-none rounded-full button relative" on:click={copyToClipboard}>
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
            <div class="bg-transparent rounded-full w-fit mt-8 border-white border-2 p-2 px-6">
              <button class="flex items-center gap-2 justify-center" on:click={generateQRCode} disabled={qrCodeGenerated}>
                <Icon class="w-[30px] h-[30px] text-white" name="qr-code" src={QrCode} alt="QR Code" />
                <p class="text-[#F1EAFE] text-xl font-['Josefin_Sans'] font-medium">{$_('button_generate_qr')}</p>
              </button>
            </div>
            {#if qrCodeUrl}
              <div class="mt-8 flex flex-col items-center">
                <img src={qrCodeUrl} alt="QR Code" class="w-40 h-40"/>
                <button class="mt-4 px-4 py-2 text-[#F1EAFE] text-xl font-['Josefin_Sans'] bg-green-500 border-none outline-none rounded-full" on:click={downloadQRCode}>
                  <Icon class="w-[25px] h-[25px] text-white" name="arrow-down-tray" src={ArrowDownTray} alt="Arrow Down Tray" />
                </button>
              </div>
            {/if}
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
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .button {
    background: linear-gradient(135deg, rgba(104,67,181,1) 0%, rgba(65,38,119,1) 100%);
  }

  .tuclase {
    background: 
          radial-gradient(circle, rgba(104,67,181,0.5) 0%, rgba(25,20,40,1) 100%),
          rgba(25,20,40,1);
  }

  .alert {
    background-color: rgb(255, 105, 105);
    border: 2px solid rgb(252, 59, 59);
    color: rgb(151, 0, 0);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>

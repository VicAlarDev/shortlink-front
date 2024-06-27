<script lang="ts">
  import { _ } from 'svelte-i18n';
  import { Icon, ArrowDownTray} from "svelte-hero-icons";

  export let url: string;
  export let qrCodeUrl: string;
  export let downloadQRCode: () => void;

</script>

<h3 class="text-2xl -mt-6 sm:-mt-12 sm:text-3xl md:text-4xl w-fit mx-auto text-center py-2 font-medium leading-6 text-[#F1EAFE] font-['Josefin_Sans']">{$_('qr_ready')}</h3>
<p class="text-lg sm:text-xl mt-2 text-center text-[#F1EAFE] font-['Poppins']">{url}</p>
<div class="mt-8 flex flex-col items-center mb-4 sm:mb-0">
  <img src={qrCodeUrl} alt="QR Code" class="w-40 h-40"/>
  <div class="bg-transparent rounded-full w-fit mt-8 border-white border-2 p-2 px-6">
    <button class="flex items-center gap-2 justify-center" on:click={downloadQRCode}>
      <Icon src={ArrowDownTray} name="arrow-down-tray" class="w-[25px] h-[25px] text-white" alt="Arrow Down Tray" />
      <p class="text-[#F1EAFE] text-xl font-['Josefin_Sans'] font-medium">{$_('download')}</p>
    </button>
  </div>
</div>

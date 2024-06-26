<script lang="ts">
  import { _ } from 'svelte-i18n'
  import Modal from './Modal.svelte';
  import { onMount } from 'svelte';
  import { getCookie, setCookie, eraseCookie } from '../helpers/cookie';

  let open = false;
  let shortCode: string = '';
  let isLoading = false;
  let openedFromCookie = false; 
  async function shorten(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const input = target[0] as HTMLInputElement;

    const storedShortCode = getCookie('shortCode');
    if (storedShortCode) {
      shortCode = storedShortCode;
      open = true;
      openedFromCookie = true;
      return;
    }

    open = true;
    isLoading = true;
    try {
      const response = await fetch('http://127.0.0.1:3000/api/shorten/random', {
        method: 'POST',
        body: JSON.stringify({ originalUrl: input.value }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        shortCode = data.shortCode;
        setCookie('shortCode', shortCode, 1, 'Lax', true); 
        openedFromCookie = false; 
      } else {
        console.error('Error shortening URL:', response);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      isLoading = false;
    }
  }

  function closeDialog() {
    open = false;
  }

  onMount(() => {
    const storedShortCode = getCookie('shortCode');
    if (storedShortCode) {
      shortCode = storedShortCode;
      open = true;
      openedFromCookie = true;
    }
  });
</script>

<div class="p-8 flex justify-center flex-col items-center">
  <p class="text-6xl font-medium text-[#F1EAFE] font-['Josefin_Sans']">{$_('title_shorten_urls')}</p>
  <p class="text-6xl font-medium text-[#F1EAFE] font-['Josefin_Sans']">{$_('subtitle_fast_easy')}</p>
  <p class="text-xl mt-8 text-[#F1EAFE] font-['Poppins']">{$_('instruction_insert_link')}</p>
</div>

<div class="pl-8 pr-2 py-2 bg-[#120E1E] rounded-full border-[#3D354B] border-2 mt-8 w-6/12 flex mx-auto flex-col items-center">
  <form on:submit={shorten} class="w-full flex flex-row items-center">
    <input type="text" placeholder="{$_('placeholder_paste_link')}" class="w-full text-[#B7AECA] text-xl font-['Poppins'] bg-transparent border-none outline-none" />
    <button class="w-fit px-8 py-4 text-[#F1EAFE] text-2xl font-['Josefin_Sans'] button border-none outline-none rounded-full button" type="submit">{$_('button_shorten')}</button>
  </form>
</div>

<Modal {open} {isLoading} {openedFromCookie} on:close={closeDialog} url={shortCode} />

<style>
  .button {
    background: linear-gradient(135deg, rgba(104,67,181,1) 0%, rgba(65,38,119,1) 100%);
  }
</style>

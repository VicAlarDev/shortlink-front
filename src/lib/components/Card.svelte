<script lang="ts">
	import { Icon, type IconSource } from "svelte-hero-icons";
    export let title: string;
    export let subtitle: string;
    export let src: IconSource;
    export let iconAlt: string;
</script>

<div class="w-full max-w-[300px] sm:max-w-[350px] h-[125px] rounded-3xl flex justify-center items-center text-white gap-4 md:gap-8 p-4 tuclase">
  <div class="rounded-full bg-[#6843B5] bg-opacity-35 w-[70px] h-[70px] flex justify-center items-center">
    <Icon src={src} alt={iconAlt} class="w-[50px] h-[50px] text-[#F1EAFE]" name="user-group" />
  </div>

  <div>
    <p class="text-[#F1EAFE] text-xl md:text-3xl font-medium font-['Josefin_Sans']">{title}</p>
    <p class="text-[#F1EAFE] text-lg md:text-xl font-light font-['Poppins']">{subtitle}</p>
  </div>
</div>

<style>
    .tuclase {
      background: rgba(25,20,40,0.25);
      background: radial-gradient(circle at 0% 0%, rgba(25,20,40,1) 0%, rgba(104,67,181,0.25) 100%);
    }
</style>

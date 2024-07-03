<script lang="ts">
  import { _ } from 'svelte-i18n'
</script>
<div class="p-8 flex justify-between">
  <p class="text-3xl font-bold text-[#6843B5] font-['Josefin_Sans']">Short<span class="text-white">{" "}Link</span></p>
  <nav class="text-xl text-white flex items-center gap-4 font-['Josefin_Sans']">
    <a href="/login" class="underline">{$_('login')}</a>
  </nav>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>
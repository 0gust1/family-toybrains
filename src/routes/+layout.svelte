<script>
	import '../app.postcss';
	import { page } from '$app/stores';
	import AppUpdatedNotif from '$lib/components/AppUpdated.svelte';
	const disconnect = () => {
		window.location.href = '/logout';
	};
</script>

<div class=" bg-pink-100 w-full flex justify-end items-baseline px-4 py-1 h-8">
	{#if $page.data.logged_in}
		{#if $page.data.username}
			<p class="text-xs mr-2">Bonjour {$page.data.username} !</p>
		{/if}
		<button
			type="button"
			class="text-xs px-2 rounded border border-purple-500"
			on:click={disconnect}>Se déconnecter</button
		>
	{/if}
</div>

<div class=" bg-gradient-to-tl from-indigo-200 via-purple-200 to-pink-200 h-full min-h-screen">
	<slot />
</div>

<!-- Render modals here. See https://github.com/mattjennings/svelte-modals -->
<!-- <Modals>
  <div slot="backdrop" class="backdrop" on:click={closeModal} on:keypress={closeModal} />
</Modals> -->

<!-- Global notification live region, render this permanently at the end of the document -->
<div
	aria-live="assertive"
	class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
>
	<div class="w-full flex flex-col text-left items-center space-y-4 sm:items-end">
		<AppUpdatedNotif />
	</div>
</div>

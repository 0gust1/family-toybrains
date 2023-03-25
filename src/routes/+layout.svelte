<script>
	import '../app.postcss';
	import { page } from '$app/stores';

	const disconnect = () => {
		window.location.href = '/logout';
	};
</script>

<div class=" bg-pink-100 w-full flex justify-end px-4 py-1 h-8">
	{#if $page.data.logged_in}
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

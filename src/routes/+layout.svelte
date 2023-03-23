<script>
	import '../app.postcss';

	const disconnect = () => {
		window.location.href = '/logout';
	};
</script>

<div class=" bg-pink-100 w-full flex justify-end px-4 py-1">
	<button type="button" class="text-xs p-2 rounded border border-purple-500" on:click={disconnect}
		>Se déconnecter</button
	>
</div>

<div class=" bg-pink-200 h-full min-h-screen">
	<slot />
</div>

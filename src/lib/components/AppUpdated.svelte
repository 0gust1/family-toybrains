<script lang="ts">
	import { updated } from '$app/stores';
	import { fly, fade } from 'svelte/transition';
	let updateDismissed = false;
	const dismissDelay = 3 * 60 * 1000; // delay before showing the notification again
	const reload = () => {
		window.location.reload();
	};

	const dismiss = () => {
		updateDismissed = true;
		setTimeout(() => {
			updateDismissed = false;
			updated.check();
		}, dismissDelay);
	};
</script>

{#if $updated && !updateDismissed}
	<!-- {#if true} -->
	<div
		in:fly
		out:fade
		class="max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 divide-x divide-gray-200"
	>
		<div class="w-0 flex-1 flex items-center p-4">
			<div class="w-full">
				<p class=" text-sm font-medium text-pink-600">
					Une nouvelle version de l'app est disponible&nbsp;!
				</p>
				<p class="mt-1 text-sm text-pink-400">
					Vous pouvez la mettre à jour en cliquant sur "Recharger l'application".
				</p>
			</div>
		</div>
		<div class="flex">
			<div class="flex flex-col divide-y divide-gray-200">
				<div class="h-0 flex-1 flex">
					<button
						type="button"
						on:click={reload}
						class="w-full border border-transparent rounded-none rounded-tr-lg px-4 py-3 flex items-center justify-center text-sm font-medium text-sky-600 hover:text-sky-700 focus:outline-none focus:z-10 focus:ring-2 focus:ring-indigo-500"
						>Recharger l'application</button
					>
				</div>
				<div class="h-0 flex-1 flex">
					<button
						type="button"
						on:click={dismiss}
						class="w-full border border-transparent rounded-none rounded-br-lg px-4 py-3 flex items-center justify-center text-xs font-medium text-pink-300 hover:text-pink-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						>Ignorer temporairement</button
					>
				</div>
			</div>
		</div>
	</div>
{/if}

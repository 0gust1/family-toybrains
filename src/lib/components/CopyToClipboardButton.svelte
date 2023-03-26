<script lang="ts">
	import { fade } from 'svelte/transition';
	import CopyToClipboard from 'svelte-copy-to-clipboard';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { Clipboard, Check, XMark } from '@steeze-ui/heroicons';

	let className = '';
	export { className as class };
	export let textToCopy: string;
	export let buttonTitle = 'Copy to clipboard';

	let failmessage: string | null = null;
	let successmessage: string | null = null;

	const handleSuccessfullyCopied = (e: Event) => {
		successmessage = `Copied to clipboard`;
		console.log(`${successmessage} - ${JSON.stringify(e)}`);
		setTimeout(() => {
			successmessage = null;
		}, 1500);
	};

	const handleFailedCopy = (e: Event) => {
		failmessage = `Failed to copy to clipboard: ${e}`;
		console.warn(`${failmessage} - ${JSON.stringify(e)}`);
		setTimeout(() => {
			failmessage = null;
		}, 1500);
	};
</script>

<div class="inline-block {className}">
	<CopyToClipboard
		text={textToCopy}
		let:copy
		on:copy={handleSuccessfullyCopied}
		on:fail={handleFailedCopy}
	>
		<button type="button" class="clipboard-copy-button" on:click={copy} title={buttonTitle}>
			{#if !successmessage && !failmessage}
				<span class="clipboard-icon" in:fade={{ delay: 400 }} out:fade
					><Icon src={Clipboard} /></span
				>
			{:else if successmessage}
				<span in:fade={{ delay: 400 }} out:fade={{ duration: 400 }}
					><Icon src={Check} class="h-5 w-5 text-green-500" /></span
				>
			{:else if failmessage}
				<span in:fade={{ delay: 400 }} out:fade={{ duration: 500 }}
					><Icon src={XMark} class="h-5 w-5 text-orange-500" /></span
				>
			{/if}
		</button>
	</CopyToClipboard>
</div>

<style lang="postcss">
	.clipboard-copy-button {
		@apply h-6 w-6  hover:bg-white rounded p-0.5 flex;
	}
	.clipboard-copy-button .clipboard-icon {
		@apply h-5 w-5;
	}
	.clipboard-copy-button:hover {
		@apply bg-pink-100 border-pink-200;
	}
	.clipboard-copy-button:hover .clipboard-icon {
		@apply text-pink-400;
	}
</style>

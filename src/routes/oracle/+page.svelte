<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { messagesStore } from './message-store';
	import CopyToClipboardButton from '$lib/components/CopyToClipboardButton.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { marked } from 'marked';

	export let data: PageData;
	export let form;
	let debug = true;
	let model = data.model;
	let isSubmitting = false;
</script>

<h1 class=" text-3xl">L'oracle bête et cultivé d'Internet, en mode kawai</h1>

<!-- <div class="m-4 p-4">
	<pre class="text-xs">
		{JSON.stringify(form, null, 2)}
	</pre>
</div>

<div class="m-4 p-4">
	<pre class="text-xs">
		{JSON.stringify(data, null, 2)}
	</pre>
</div> -->

<div>
	{#if form && form.error}
		<div class="m-4 p-4 border-2 border-red-500">
			{form.error}
		</div>
	{/if}
</div>

<div class="m-4 p-4">
	<div>
		{#each data.messages as msg}
			<div
				class:role-assistant={msg.message.role === 'assistant'}
				class:role-user={msg.message.role === 'user'}
				class="message"
			>
				<div class="flex">
					<article class="content prose">
						{@html marked.parse(msg.message.content)}
						<!-- {msg.message.content.trimStart()} -->
					</article>
					{#if msg.message.role === 'assistant'}
						<CopyToClipboardButton
							class="ml-auto"
							textToCopy={msg.message.content}
							buttonTitle="Copier dans le presse-papier"
						/>
					{/if}
				</div>
			</div>
		{/each}
		{#if isSubmitting}
			<div class="role role-assistant">
				<span class="block">assistant: </span>
				<Spinner />
			</div>
		{/if}
	</div>
	<form
		class="w-full"
		method="POST"
		use:enhance={({ form, data, action, cancel, submitter }) => {
			// `form` is the `<form>` element
			// `data` is its `FormData` object
			// `action` is the URL to which the form is posted
			// `cancel()` will prevent the submission
			// `submitter` is the `HTMLElement` that caused the form to be submitted
			isSubmitting = true;
			return async ({ result, update }) => {
				// `result` is an `ActionResult` object
				// `update` is a function which triggers the logic that would be triggered if this callback wasn't set
				isSubmitting = false;
				update();
			};
		}}
	>
		<div class="flex gap-2 w-full mb-6">
			<label class="flex w-1/2">
				<textarea
					name="message"
					required
					class="w-full border border-gray-300 rounded bg-opacity-60 bg-white p-2"
				/>
			</label>
			{#if !isSubmitting}
				<button
					type="submit"
					class=" border border-sky-700 bg-sky-600 rounded-2xl text-white px-3 py-2 shadow-md hover:bg-sky-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y"
					>Submit</button
				>
			{:else}
				<Spinner />
			{/if}
			{#if form && form.lastUsage}
				<div class="text-xs text-right grow">
					<strong>tokens:</strong> prompt: {form?.lastUsage?.prompt_tokens} | completion: {form
						?.lastUsage?.completion_tokens} | total: {form?.lastUsage?.total_tokens}
				</div>
			{/if}
		</div>
		{#if debug}
			<div class="debug">
				<label>
					<span>Model:</span>
					<select name="model" bind:value={model}>
						{#each data.models as model}
							<option value={model}>{model}</option>
						{/each}
					</select>
				</label>
			</div>
		{/if}
	</form>
</div>

<style lang="postcss">
	.message {
		@apply my-2 px-4 py-6 border-2 border-opacity-50 border-slate-200 rounded;
	}
	.message .content {
		/* @apply whitespace-pre-line; */
		@apply prose prose-slate prose-sm;
	}
	.role-assistant {
		@apply mr-9 pl-6 border-blue-200 border-opacity-20 bg-blue-100 text-slate-800 bg-opacity-50 rounded-r-2xl;
	}
	.role-user {
		@apply ml-9 border-green-200 border-opacity-20 bg-green-100 text-slate-800 bg-opacity-50 rounded-l-2xl;
	}
	.debug {
		@apply mt-2 text-xs bg-yellow-200 bg-opacity-30 p-4 rounded-lg;
	}
</style>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { messagesStore } from '../message-store';
	import CopyToClipboardButton from '$lib/components/CopyToClipboardButton.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let data;
	export let form;
	let debug = true;
	let model = data.model;
	let isSubmitting = false;

	let top_p = 1.0;
	let temperature = 1.0;

	onMount(() => {
		window.scrollTo(0, document.body.scrollHeight);
	});
</script>

<div>
	<div
		class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sticky top-12 lg:top-0 bg-blue-200 bg-opacity-80 z-10 text-blue-800"
	>
		<h1 class="text-xl sm:text-2xl md:text-3xl">
			{data?.current_conversation?.name}
		</h1>

		<p class="text-xs text-slate-500">
			Conversation créée le {new Date(data.current_conversation?.created_at).toLocaleDateString()}
		</p>
	</div>
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
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="m-4 p-4">
			<div class="w-11/12 sm:w-9/12 lg:w-3/5 mx-auto">
				{#each data.messages as msg}
					<div
						class:role-assistant={msg.message.role === 'assistant'}
						class:role-user={msg.message.role === 'user'}
						class="message"
					>
						<div class="flex relative">
							{#if msg.message.role === 'assistant'}
								<img
									src="/robot1.svg"
									class=" w-16 h-16 absolute -top-4 -left-24 "
									alt="petit robot mignon"
								/>
							{/if}
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
				id="prompt-form"
				class="w-full md:w-3/5 mx-auto"
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
				<div class="flex gap-2 w-full items-center mb-6">
					<label class="flex w-full">
						<textarea
							name="message"
							required
							rows="5"
							class="w-full border border-gray-300 rounded bg-opacity-60 bg-white p-4 "
						/>
					</label>
					{#if !isSubmitting}
						<button
							type="submit"
							class=" border border-sky-700 bg-sky-600 rounded-2xl text-white px-3 py-2 shadow-md hover:bg-sky-700 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 active:translate-y"
							>Envoyer</button
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

				{#if form && form.error}
					<div class="m-4 p-2 flex items-end text-xs">
						<img src="/robot1.svg" alt="" class="w-14 h-14" />
						<div class="px-2">
							<p class="text-sm font-medium text-red-700">{form.message}</p>
							<div class="bg-orange-100 p-2 border-2 border-red-400 rounded-md">
								<p>({form.error.error.code})</p>
								<p>
									{form.error.error.message}
								</p>
							</div>
							<!-- {JSON.stringify(form.error)} -->
						</div>
					</div>
				{/if}
				{#if debug}
					<div class="debug">
						<label>
							temperature:
							<input
								form="prompt-form"
								type="range"
								name="temperature"
								bind:value={temperature}
								min="0"
								max="2"
								step="0.1"
							/>
						</label>
						<label>
							<span>top_p probability</span>
							<input
								form="prompt-form"
								type="range"
								name="top_p"
								bind:value={top_p}
								min="0"
								max="2"
								step="0.1"
							/>
						</label>
						<label>
							<span>Model:</span>
							<select name="model" bind:value={model}>
								{#each data.models as model}
									<option value={model.id}>{model.id}</option>
								{/each}
							</select>
						</label>
					</div>
				{/if}
			</form>
		</div>
	</div>
</div>

<style lang="postcss">
	.message {
		@apply my-2 px-4 py-6 border-2 border-opacity-60 border-slate-200 rounded;
	}
	.message .content {
		/* @apply whitespace-pre-line; */
		@apply prose prose-slate prose-sm;
	}
	.role-assistant {
		@apply relative mr-9 pl-6 border-blue-200 border-opacity-20 bg-blue-100 text-slate-800 bg-opacity-70 rounded-r-2xl shadow-md;
		@apply mr-3 md:mr-9;
	}

	.role-user {
		@apply border-green-200 border-opacity-20 bg-green-100 text-slate-800 bg-opacity-50 rounded-l-2xl shadow-md;
		@apply ml-3 md:ml-9;
	}
	.debug {
		@apply flex mt-2 p-4 flex-col;
		@apply text-xs bg-yellow-200 bg-opacity-30 rounded-lg;
	}

	/* 	.role-assistant:before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		bottom: 100%;
		@apply -left-6 top-6; 
		border: 0.9rem solid transparent;
		border-top: none;

		@apply border-b-blue-100 border-opacity-60;
		transform: rotate(-90deg) translateY(0.1rem);
		filter: drop-shadow(0 -0.0625rem 0.0625rem rgba(0, 0, 0, 0.1));
	} */
</style>

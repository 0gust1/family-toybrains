<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRight } from '@steeze-ui/heroicons';
	import { page } from '$app/stores';
	import { ChatBubbleLeftRight as Chat } from '@steeze-ui/heroicons';
	export let conversations;
	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
</script>

<h1 class="font-rounded-sans text-xl text-gray-400">
	<a href="/oracle"> Conversations </a>
</h1>
<ul class="text-gray-300">
	<li class="mt-2">
		<a href="/oracle">
			<span class="text-sm font-medium mt-4 text-blue-400">
				Créer une nouvelle conversation +
			</span>
		</a>
	</li>
	{#each conversations as conversation}
		{@const current = $page.data?.current_conversation?.id === conversation.id}
		{@const convDate = new Date(conversation.created_at)}
		<li class="p-1" class:current>
			<a class="flex gap-1 items-center" href="/oracle/{conversation.id}">
				<div class="w-6">
					<Icon src={Chat} class="h-5 w-5 mr-1 grow-0" />
				</div>
				<div>
					<p class="font-normal">
						{conversation.name}
					</p>
					<p class="text-xs text-gray-400">
						{conversation.users ? `par ${conversation.users.name}, ` : ''}
						{convDate.toLocaleDateString(undefined, dateOptions)} - {convDate.toLocaleTimeString()}
					</p>
				</div>
				{#if current}
					<Icon src={ArrowRight} class="h-6 w-6 ml-auto" />
				{/if}
			</a>
			<!-- {JSON.stringify(conversation, null, 2)} -->
		</li>
	{:else}
		<p class="border border-dashed border-slate-500 p-2 rounded-md mr-2 mt-2 text-slate-400">
			Pas de conversations pour le moment !
		</p>
	{/each}
</ul>

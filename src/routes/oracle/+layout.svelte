<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from './Sidebar.svelte';
	export let data: LayoutData;
	let conversations = data.conversations;
</script>

<Sidebar {conversations} />

<main class="flex-1">
	<div class="py-6">
		<slot />
	</div>
</main>

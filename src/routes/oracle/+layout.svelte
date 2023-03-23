<script lang="ts">
	import Sidebar from './Sidebar.svelte';
	export let data;
	let conversations = data.conversations ?? [];
</script>

<Sidebar {conversations}>
	<main class="flex-1">
		<div class="py-6">
			<slot />
		</div>
	</main>
</Sidebar>

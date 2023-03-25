<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from './Sidebar.svelte';
	export let data;
	let conversations = data.conversations ?? [];
</script>

<Sidebar conversations={$page.data.conversations}>
	<main class="flex-1">
		<div class="">
			<slot />
		</div>
	</main>
</Sidebar>

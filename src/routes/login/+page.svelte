<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<div class="p-4">
	<div class="w-1/2 mx-auto font-rounded-sans">
		<h1 class="text-3xl my-4">N'entre pas ici qui veut !</h1>

		<form method="POST" use:enhance class="text-lg">
			<p class="my-4">
				<label>Entrez votre nom: <input required name="username" type="text" /></label>
			</p>
			<p class="my-4">
				<label>Entrez le mot de passe: <input required name="password" type="password" /></label>
			</p>
			<p>
				<button type="submit" class="p-4 border border-purple-600 rounded-md">Entrer</button>
			</p>
		</form>

		{#if form && !form.password_correct}
			<p>The password is not correct.</p>
		{/if}
	</div>
</div>

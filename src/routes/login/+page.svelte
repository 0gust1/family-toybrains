<script lang="ts">
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
</script>

<div class="p-4">
	<div class="w-1/2 mx-auto font-rounded-sans">
		<h1 class="text-3xl my-4">N'entre pas ici qui veut !</h1>

		<form method="POST" use:enhance class="text-lg">
			<div class="flex gap-4">
				<div class="shrink-0">
					<p class="my-4">
						<label>Entrez votre nom: <input required name="username" type="text" /></label>
					</p>
					<p class="my-4">
						<label>Entrez le mot de passe: <input required name="password" type="password" /></label
						>
					</p>
				</div>
				{#if form && (!form.password_correct || !form.user)}
					<div class="bg-red-500 bg-opacity-50 px-4 py-6 rounded-md text-sm text-red-900">
						<p>Soit le mot de passe est incorrect, ou soit l'utilisateur est inconnu !</p>
					</div>
				{/if}
			</div>
			<p>
				<button type="submit" class="p-4 border border-purple-600 rounded-md">Entrer</button>
			</p>
		</form>
	</div>
</div>

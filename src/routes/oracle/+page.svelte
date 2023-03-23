<script lang="ts">
	import { enhance } from '$app/forms';
	export let data;
	export let form;
</script>

<!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
</div> -->

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="flex items-start">
		<div class="bg-orange-200 bg-opacity-50 p-8 shadow rounded-xl">
			<p class="text-3xl font-black font-rounded-sans">Bonjour !</p>
			<p class="mt-4">Je suis le robot ChatGPT.</p>
		</div>
		<img src="/robot1.svg" class="w-1/3" alt="" />
	</div>
	<div>
		<form method="POST" use:enhance>
			<ul>
				<li>
					<label for=""
						>Nom
						<input type="text" name="conv_name" />
					</label>
				</li>
				<li>
					<button type="submit" class="bg-pink-600 p-4 rounded-md"> Créer </button>
				</li>
			</ul>
		</form>
	</div>
</div>

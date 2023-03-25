<script lang="ts">
	import { enhance } from '$app/forms';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ChatBubbleLeftRight as Chat } from '@steeze-ui/heroicons';
	export let data;
	export let form;
</script>

<!-- <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
</div> -->

<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<div class="flex items-start mt-4">
		<div
			class="bg-orange-200 bg-opacity-50 p-8 shadow rounded-full rounded-l-none text-lg text-sky-700 font-rounded-sans "
		>
			<p class="text-3xl font-black text-pink-500">Bonjour, je suis le robot ChatGPT!</p>
			<p class="mt-4">Je suis à la fois très intelligent et très bête.</p>
			<p class="mt-2">
				En effet, je suis capable de répondre à des questions, mais je ne suis pas capable de <strong
					>vraiment</strong
				> comprendre ce que tu me dis.
			</p>
			<p class="mt-2">
				Je suis néanmoins capable de m'améliorer en apprenant de tes réponses, et en apprenant de
				mes propre erreurs.
			</p>
			<p class="mt-2">
				<strong class="underline underline-offset-4 text-fuchsia-700">
					Par contre, méfie-toi, je suis très doué pour parfois dire des choses fausses de manière
					très convaincante !
				</strong>
			</p>
		</div>
		<img src="/robot1.svg" class="w-1/3 drop-shadow-[0_0px_50px_rgba(200,100,100,0.9)]" alt="" />
	</div>
	<div class="mt-4 flex items-center gap-6">
		<Icon src={Chat} class=" w-52 h-52" />
		<form method="POST" use:enhance>
			<h1 class="font-rounded-sans text-3xl">Crée une conversation avec moi !</h1>
			<ul class="text-lg mt-4">
				<li>
					<label for=""
						>Nom de la conversation
						<input type="text" required name="conv_name" />
					</label>
				</li>
				<li>
					<button type="submit" class="bg-pink-600 p-4 rounded-md"> Créer </button>
				</li>
			</ul>
		</form>
	</div>
</div>

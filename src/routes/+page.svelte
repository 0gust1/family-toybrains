<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRightCircle } from '@steeze-ui/heroicons';
</script>

<div class="py-20 px-10">
	<h1 class="text-4xl font-rounded-sans text-center font-bold text-teal-500 mb-6">
		Bienvenue chez les robots des Internets !
	</h1>

	<div class="flex flex-wrap justify-center">
		<img class=" w-56" src="/robot1.svg" alt="" />
		<img class=" w-56" src="/robot2.svg" alt="" />
		<img class=" w-56" src="/robot3.svg" alt="" />
		<img class=" w-56" src="/robot4.svg" alt="" />
		<img class=" w-56" src="/robot5.svg" alt="" />
	</div>

	<div class="mt-8 px-2 py-8 rounded-md bg-blue-500 bg-opacity-50">
		<ul class="list-none text-blue-800 text-2xl font-rounded-sans">
			<li>
				<Icon src={ArrowRightCircle} class="h-6 w-6 inline-block mr-2" /><a href="/oracle"
					>Accéder à l'oracle</a
				>
			</li>
		</ul>
	</div>
</div>

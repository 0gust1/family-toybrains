<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon';
	import { ArrowRightCircle } from '@steeze-ui/heroicons';
</script>

<div class="py-20 px-10">
	<h1 class="text-3xl">Bienvenue !</h1>
	<div class="mt-8 px-2 py-8 bg-blue-500 bg-opacity-50">
		<ul class="list-none">
			<li>
				<Icon src={ArrowRightCircle} class="h-6 w-6 inline-block mr-2" /><a href="/oracle"
					>Accéder à l'oracle</a
				>
			</li>
		</ul>
	</div>
</div>

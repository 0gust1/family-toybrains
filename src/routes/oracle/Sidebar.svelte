<script lang="ts">
	import ConversationsList from './ConversationsList.svelte';

	export let menuOpen = false;
	export let conversations;

	const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
</script>

<!--
  This example requires updating your template:

  ```
  <html class="h-full bg-gray-100">
  <body class="h-full">
  ```
-->
<div>
	<!-- Off-canvas menu for mobile, show/hide based on off-canvas menu state. -->
	<div class="relative z-40 lg:hidden hidden" role="dialog" aria-modal="true" class:menuOpen>
		<!--
      Off-canvas menu backdrop, show/hide based on off-canvas menu state.

      Entering: "transition-opacity ease-linear duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "transition-opacity ease-linear duration-300"
        From: "opacity-100"
        To: "opacity-0"
    -->
		<div class="fixed inset-0 bg-gray-600 bg-opacity-75" />

		<div class="fixed inset-0 z-40 flex">
			<!--
        Off-canvas menu, show/hide based on off-canvas menu state.

        Entering: "transition ease-in-out duration-300 transform"
          From: "-translate-x-full"
          To: "translate-x-0"
        Leaving: "transition ease-in-out duration-300 transform"
          From: "translate-x-0"
          To: "-translate-x-full"
      -->
			<div class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
				<!--
          Close button, show/hide based on off-canvas menu state.

          Entering: "ease-in-out duration-300"
            From: "opacity-0"
            To: "opacity-100"
          Leaving: "ease-in-out duration-300"
            From: "opacity-100"
            To: "opacity-0"
        -->
				<div class="absolute top-0 right-0 -mr-12 pt-2">
					<button
						type="button"
						on:click={() => {
							menuOpen = false;
						}}
						class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					>
						<span class="sr-only">Close sidebar</span>
						<svg
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>

				<div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
					<div class="flex flex-shrink-0 items-center px-4">
						<a
							href="/"
							on:click={() => {
								menuOpen = false;
							}}
							class="text-pink-500">&lt; Retour à l'accueil</a
						>
					</div>
					<nav class="mt-5 space-y-1 px-2">
						<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<ConversationsList {conversations} />
					</nav>
				</div>
				<!-- 				<div class="flex flex-shrink-0 bg-gray-700 p-4">
					<a href="#" class="group block flex-shrink-0">
						<div class="flex items-center">
							<div>
								<img
									class="inline-block h-10 w-10 rounded-full"
									src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
									alt=""
								/>
							</div>
							<div class="ml-3">
								<p class="text-base font-medium text-white">Tom Cook</p>
								<p class="text-sm font-medium text-gray-400 group-hover:text-gray-300">
									View profile
								</p>
							</div>
						</div>
					</a>
				</div> -->
			</div>

			<div class="w-14 flex-shrink-0">
				<!-- Force sidebar to shrink to fit close icon -->
			</div>
		</div>
	</div>

	<!-- Static sidebar for desktop -->
	<div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
		<!-- Sidebar component, swap this element with another sidebar if you like -->
		<div class="flex min-h-0 flex-1 flex-col bg-gray-800">
			<div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
				<div class="flex flex-shrink-0 items-center px-4">
					<a href="/" class="text-pink-500">&lt; Retour à l'accueil</a>
				</div>
				<nav class="mt-5 flex-1 space-y-1 pl-2">
					<!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
					<ConversationsList {conversations} />
				</nav>
			</div>
			<!-- 			<div class="flex flex-shrink-0 bg-gray-700 p-4">
				<a href="#" class="group block w-full flex-shrink-0">
					<div class="flex items-center">
						<div>
							<img
								class="inline-block h-9 w-9 rounded-full"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
						</div>
						<div class="ml-3">
							<p class="text-sm font-medium text-white">Tom Cook</p>
							<p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">
								View profile
							</p>
						</div>
					</div>
				</a>
			</div> -->
		</div>
	</div>
	<div class="flex flex-1 flex-col lg:pl-64">
		<div class="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 lg:hidden">
			<button
				type="button"
				on:click={() => {
					menuOpen = !menuOpen;
				}}
				class="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
			>
				<span class="sr-only">Open sidebar</span>
				<svg
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>

		<slot />
	</div>
</div>

<style lang="postcss">
	.menuOpen {
		@apply block;
	}
	ul {
		@apply list-disc;
	}
	.current {
		@apply bg-blue-300 bg-opacity-30 text-white;
	}

	.current::after {
		content: '';
	}
</style>
